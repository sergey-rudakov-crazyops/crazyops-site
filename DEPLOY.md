# Деплой crazyops.io

## Как работает

Сайт — статический Next.js export. Артефакт сборки (папка `out/`) кладётся на сервер по `rsync`, nginx раздаёт файлы. Перезапуск nginx **не требуется** — он читает файлы с диска по запросу.

```
GitHub push (main)
        │
        ▼
GitHub Actions runner (ubuntu-latest)
  ├── checkout
  ├── npm ci
  ├── npm run build         → out/
  └── rsync out/ → server:/var/www/crazyops.io/
                                      │
                                      ▼
                              nginx (host, native)
                                      │
                                      ▼
                              https://www.crazyops.io
```

Конфиг сборки: `next.config.ts` — `output: "export"`, `images.unoptimized: true`.
Workflow: `.github/workflows/deploy.yml`.

## Триггеры

- `push` в ветку `main` — автоматический деплой.
- `workflow_dispatch` — ручной запуск из вкладки Actions.
- `concurrency: deploy-prod` — параллельные деплои не запускаются.

## Шаги workflow

1. **Checkout** репозитория.
2. **Setup Node 20** + npm-кэш.
3. **`npm ci`** — детерминированная установка из `package-lock.json`.
4. **`npm run build`** — Next генерит статику в `out/`.
5. **SSH agent** загружает приватный ключ из секрета `SSH_PRIVATE_KEY`.
6. **`ssh-keyscan`** пишет fingerprint сервера в `known_hosts` (защита от MITM).
7. **`rsync -az --delete`** заливает `out/` в `/var/www/crazyops.io/` на сервере.
   - `-a` — рекурсивно, права/симлинки.
   - `-z` — gzip в транспорте.
   - `--delete` — удалить с сервера файлы, которых нет в `out/`.
   - `--chmod=D755,F644` — нормализовать права после копирования.
8. **Smoke test** — `curl -I https://www.crazyops.io`.

## Архитектура на сервере

```
/var/www/crazyops.io/        ← сюда rsync пишет out/
  ├── index.html
  ├── 404.html
  ├── _next/static/...       ← immutable, hash в имени
  └── *.svg, *.png, ...

/etc/nginx/sites-available/crazyops.io   ← конфиг nginx
/etc/nginx/sites-enabled/crazyops.io     ← симлинк
/etc/letsencrypt/live/crazyops.io-0001/  ← SSL (managed by certbot)
```

Пользователи и права:
- `deploy` — владелец `/var/www/crazyops.io`, пишет через rsync, без пароля, логин по SSH-ключу.
- `www-data` — группа на каталоге, nginx читает по group permission.
- nginx работает от `www-data` (см. `/etc/nginx/nginx.conf`: `user www-data;`).

## Секреты GitHub

Repo → Settings → Secrets and variables → Actions:

| Имя | Значение |
|-----|---------|
| `SSH_HOST` | IP сервера или `crazyops.io` |
| `SSH_USER` | `deploy` |
| `SSH_PRIVATE_KEY` | содержимое приватного ключа (целиком, с `-----BEGIN…END-----`) |
| `SSH_PORT` | (опц.) если SSH не на 22 |

## Первичная настройка сервера

Выполняется один раз. Все команды от админ-пользователя с `sudo`.

### 1. Каталог под сайт

```bash
sudo mkdir -p /var/www/crazyops.io
```

### 2. Deploy-пользователь

```bash
sudo adduser --disabled-password --gecos "" deploy
sudo chown -R deploy:www-data /var/www/crazyops.io
sudo chmod -R 755 /var/www/crazyops.io
```

- Без пароля → логин только по SSH-ключу.
- `deploy` пишет файлы (rsync), `www-data` (nginx) читает по group permission.

### 3. SSH-ключ для GitHub Actions (на локалке)

```bash
ssh-keygen -t ed25519 -C "gh-actions-crazyops" -f ~/.ssh/crazyops_deploy -N ""
```

Получишь:
- `~/.ssh/crazyops_deploy` — приватный, в GitHub Secret `SSH_PRIVATE_KEY`.
- `~/.ssh/crazyops_deploy.pub` — публичный, на сервер.

### 4. Положить публичный ключ на сервер

С локалки:

```bash
ssh-copy-id -i ~/.ssh/crazyops_deploy.pub deploy@SERVER_IP
```

Если не получилось (deploy без пароля) — вручную через своего админа на сервере:

```bash
sudo mkdir -p /home/deploy/.ssh
sudo nano /home/deploy/.ssh/authorized_keys   # вставить содержимое .pub
sudo chown -R deploy:deploy /home/deploy/.ssh
sudo chmod 700 /home/deploy/.ssh
sudo chmod 600 /home/deploy/.ssh/authorized_keys
```

Проверка:

```bash
ssh -i ~/.ssh/crazyops_deploy deploy@SERVER_IP "whoami && ls -la /var/www/crazyops.io"
```

### 5. nginx-конфиг

Создать `/etc/nginx/sites-available/crazyops.io` со следующим содержимым:

```nginx
# HTTP -> HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name crazyops.io www.crazyops.io;
    return 301 https://www.crazyops.io$request_uri;
}

# apex -> www
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name crazyops.io;

    ssl_certificate     /etc/letsencrypt/live/crazyops.io-0001/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/crazyops.io-0001/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;

    return 301 https://www.crazyops.io$request_uri;
}

# www.crazyops.io — Next static export
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name www.crazyops.io;

    ssl_certificate     /etc/letsencrypt/live/crazyops.io-0001/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/crazyops.io-0001/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;

    root /var/www/crazyops.io;
    index index.html;

    # Security headers
    add_header X-Content-Type-Options nosniff always;
    add_header X-Frame-Options DENY always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # gzip
    gzip on;
    gzip_vary on;
    gzip_comp_level 6;
    gzip_min_length 256;
    gzip_proxied any;
    gzip_types
        text/plain
        text/css
        text/xml
        application/javascript
        application/json
        application/xml
        image/svg+xml
        font/woff2;

    # Иммутабельные ассеты Next
    location /_next/static/ {
        access_log off;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Картинки и шрифты
    location ~* \.(svg|png|jpg|jpeg|webp|ico|woff2)$ {
        access_log off;
        expires 30d;
        add_header Cache-Control "public";
    }

    # Чистые URL (Next export пишет /foo.html и /foo/index.html)
    location / {
        try_files $uri $uri.html $uri/index.html =404;
    }

    error_page 404 /404.html;
    location = /404.html {
        internal;
    }
}
```

Команды (на сервере):

```bash
sudo nano /etc/nginx/sites-available/crazyops.io      # вставить конфиг выше
sudo ln -sf /etc/nginx/sites-available/crazyops.io /etc/nginx/sites-enabled/crazyops.io
```

### 6. Применить и проверить

```bash
sudo nginx -t
sudo systemctl reload nginx

curl -I https://www.crazyops.io
curl -I https://crazyops.io        # 301 -> www
curl -I http://crazyops.io         # 301 -> https www
```

### 7. GitHub Secrets

Добавить значения из таблицы выше (`SSH_HOST`, `SSH_USER`, `SSH_PRIVATE_KEY`, опционально `SSH_PORT`).

Скопировать приватный ключ в буфер:

```bash
# macOS
cat ~/.ssh/crazyops_deploy | pbcopy
# Linux (xclip)
cat ~/.ssh/crazyops_deploy | xclip -selection clipboard
```

После этого `git push origin main` запустит первый деплой.

## Проверка после деплоя

```bash
curl -I https://www.crazyops.io           # 200 OK
curl -I https://crazyops.io               # 301 -> www
curl -I http://crazyops.io                # 301 -> https www
curl -I https://www.crazyops.io/_next/static/  # Cache-Control: public, immutable
```

## Откат

Готовых тегов/релизов нет — `--delete` стирает старые файлы. Для отката:

1. `git revert <bad-sha> && git push origin main` — workflow пересоберёт и задеплоит предыдущую версию.
2. Либо вручную: `git checkout <good-sha> && gh workflow run deploy.yml` (через `workflow_dispatch`).

Если нужен мгновенный откат без пересборки — расширь схему до релизов с симлинками (`releases/<sha>/` + `current` symlink).

## Кэш и инвалидация

- `_next/static/*` — `Cache-Control: public, immutable, max-age=1y`. Имена с хэшем — на каждой сборке новые.
- `*.svg/png/woff2 и т.п.` — `max-age=30d`.
- HTML — без `Cache-Control` от nginx, отдаётся как есть. Браузер закэширует минимально.

При деплое `--delete` стирает старые `_next/static/*`. Активные сессии у юзеров теоретически могут потерять chunk до перехода — для лендинга риск пренебрежимо мал. Если станет проблемой — переходим на схему с симлинками.

## Локальный запуск

```bash
npm ci
npm run dev          # dev-сервер на http://localhost:3000
npm run build        # собрать статику в out/
npx serve out        # проверить out/ локально
```

## Где смотреть проблемы

- **Actions упал** — вкладка Actions в GitHub, открыть прогон, читать логи шага.
- **Сайт 502/500** — статика не отдаётся, проблема в nginx → `sudo journalctl -u nginx -n 50`, `sudo nginx -t`.
- **Сайт показывает старое** — проверь `ls -la /var/www/crazyops.io/`, кэш браузера, `curl -I` чтобы увидеть заголовки.
- **rsync падает на permission denied** — проверь владельца `/var/www/crazyops.io` (должен быть `deploy`).
- **SSH connection refused** — проверь `SSH_HOST`, `SSH_PORT`, файрвол, ключ в `authorized_keys`.
