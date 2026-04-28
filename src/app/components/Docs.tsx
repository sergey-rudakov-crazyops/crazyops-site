const docs = [
  {
    icon: '🔒',
    iconBg: 'rgba(124,92,252,0.15)',
    label: 'For Users',
    title: 'Privacy Policy',
    desc: 'How we collect, use, and protect your personal data across all CrazyOps products. GDPR & CCPA compliant.',
    chips: ['PDF', 'Updated Jan 2026', 'GDPR'],
  },
  {
    icon: '📋',
    iconBg: 'rgba(244,114,182,0.15)',
    label: 'For Users',
    title: 'Terms of Use',
    desc: 'Rules and responsibilities for using our apps, platforms, and services. Plain language, no legalese traps.',
    chips: ['PDF', 'Updated Jan 2026', 'All regions'],
  },
  {
    icon: '🍎',
    iconBg: 'rgba(20,184,166,0.15)',
    label: 'App Store · Apple',
    title: 'iOS App Privacy Policy',
    desc: 'Required Apple App Store disclosure — data types collected, usage, and third-party SDKs used in our iOS apps.',
    chips: ['PDF', 'App Store compliant', 'iOS 17+'],
  },
  {
    icon: '🤖',
    iconBg: 'rgba(251,191,36,0.15)',
    label: 'Google Play · Android',
    title: 'Android App Privacy Policy',
    desc: 'Google Play Store required disclosure — data safety section, permissions rationale, and retention periods.',
    chips: ['PDF', 'Play Store compliant', 'Android 12+'],
  },
];

function Chip({ label }: { label: string }) {
  return (
    <span
      className="text-[11px] font-semibold px-[10px] py-1 rounded-full"
      style={{ border: '1px solid var(--border)', color: 'var(--muted2)' }}
    >
      {label}
    </span>
  );
}

export default function Docs() {
  return (
    <section id="docs" className="px-5 py-16 md:px-10 md:py-24" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-12">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--purple-light)] mb-[14px] block">
            Legal Documents
          </span>
          <h2
            className="font-black leading-[1.08] tracking-[-0.025em] mb-4"
            style={{ fontSize: 'clamp(26px, 4vw, 44px)' }}
          >
            Policies & Terms
          </h2>
          <p className="text-base leading-[1.7] max-w-[520px]" style={{ color: 'var(--muted2)' }}>
            All our apps and services are covered by clear, compliant legal documentation — for users, stores, and
            regulators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {docs.map(({ icon, iconBg, label, title, desc, chips }) => (
            <a
              key={title}
              href="#"
              className="doc-card flex items-start gap-5 p-7 rounded-2xl"
              style={{ border: '1px solid var(--border)', background: 'var(--card)' }}
            >
              <div
                className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center text-2xl shrink-0"
                style={{ background: iconBg }}
              >
                {icon}
              </div>
              <div className="flex-1">
                <div
                  className="text-[11px] font-bold uppercase tracking-[0.12em] mb-[6px]"
                  style={{ color: 'var(--muted)' }}
                >
                  {label}
                </div>
                <div className="text-base font-extrabold mb-2">{title}</div>
                <div className="text-[13px] leading-[1.55] mb-[14px]" style={{ color: 'var(--muted2)' }}>
                  {desc}
                </div>
                <div className="flex gap-3 flex-wrap">
                  {chips.map((chip) => (
                    <Chip key={chip} label={chip} />
                  ))}
                </div>
              </div>
              <div className="doc-arrow text-lg shrink-0 self-center">↗</div>
            </a>
          ))}
        </div>

        {/* Store badges */}
        <div
          className="p-7 rounded-2xl flex items-center justify-between flex-wrap gap-6"
          style={{
            border: '1px solid var(--border)',
            background: 'linear-gradient(135deg, rgba(124,92,252,0.07), rgba(244,114,182,0.05))',
          }}
        >
          <div>
            <h3 className="text-[17px] font-extrabold mb-[6px]">Find us on the stores</h3>
            <p className="text-[13px] leading-[1.6] max-w-[380px]" style={{ color: 'var(--muted2)' }}>
              Our apps are available on both major platforms. Tap to browse our published portfolio directly in the
              stores.
            </p>
          </div>
          <div className="flex gap-[10px] flex-wrap">
            {[
              { icon: '🍎', line1: 'Download on the', line2: 'App Store' },
              { icon: '▶️', line1: 'Get it on', line2: 'Google Play' },
            ].map(({ icon, line1, line2 }) => (
              <a
                key={line2}
                href="#"
                className="store-btn flex items-center gap-[10px] px-5 py-[10px] rounded-[10px] no-underline"
                style={{
                  border: '1px solid var(--border)',
                  background: 'var(--card)',
                  color: '#fff',
                }}
              >
                <span className="text-xl">{icon}</span>
                <span className="text-[13px] font-semibold">
                  {line1}
                  <br />
                  <strong>{line2}</strong>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
