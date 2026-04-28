const metrics = [
  { val: '120+', lbl: 'apps live' },
  { val: '4.8★', lbl: 'avg rating' },
  { val: '12wk', lbl: 'avg MVP' },
  { val: '98%', lbl: 'on time' },
];

const services = [
  {
    num: '01',
    head: 'UI/UX Design',
    text: 'Research, wireframes, prototypes, and pixel-perfect design systems. We design for humans, not Dribbble likes.',
    tags: ['Figma', 'Prototyping', 'Usability testing'],
  },
  {
    num: '02',
    head: 'App Store Optimization',
    text: 'Screenshots, metadata, A/B testing, and keyword strategy to maximise organic downloads from day one.',
    tags: ['ASO', 'A/B testing', 'Analytics'],
  },
  {
    num: '03',
    head: 'Backend & API',
    text: 'Scalable cloud infrastructure, real-time sync, push notifications, and third-party integrations done right.',
    tags: ['AWS', 'Firebase', 'GraphQL'],
  },
  {
    num: '04',
    head: 'QA & Testing',
    text: 'Manual + automated testing across 50+ real devices. We catch bugs before your users do.',
    tags: ['Detox', 'XCTest', 'Espresso'],
  },
];

function Tag({ label }: { label: string }) {
  return (
    <span
      className="text-[11px] font-semibold px-3 py-[5px] rounded-full"
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid var(--border)',
        color: 'var(--muted2)',
      }}
    >
      {label}
    </span>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="px-5 py-16 md:px-10 md:py-24"
      style={{ borderTop: '1px solid var(--border)', background: 'var(--bg2)' }}
    >
      <div className="max-w-[1100px] mx-auto">
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--purple-light)] mb-[14px] block">
          What We Do
        </span>
        <h2
          className="font-black leading-[1.08] tracking-[-0.025em] mb-14"
          style={{ fontSize: 'clamp(26px, 4vw, 44px)' }}
        >
          Full-cycle mobile
          <br />
          development.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Featured card */}
          <div
            className="svc-card col-span-1 md:col-span-2 p-8 rounded-2xl flex flex-col md:flex-row gap-6 md:gap-10 md:items-center"
            style={{
              background: 'linear-gradient(135deg, rgba(124,92,252,0.12), rgba(244,114,182,0.08))',
              border: '1px solid rgba(124,92,252,0.25)',
            }}
          >
            <div className="flex-1">
              <div className="text-[12px] font-bold text-[var(--purple-light)] mb-[14px] tracking-[0.08em]">
                ★ FLAGSHIP
              </div>
              <div className="text-[19px] font-extrabold mb-[10px]">End-to-End App Development</div>
              <div className="text-sm leading-[1.65] mb-4" style={{ color: 'var(--muted2)' }}>
                From discovery and wireframes to App Store submission and post-launch growth. We own the entire product
                lifecycle.
              </div>
              <div className="flex flex-wrap gap-[6px]">
                {['iOS · Swift', 'Android · Kotlin', 'Flutter', 'React Native', 'Node.js backend', 'CI/CD'].map(
                  (tag) => (
                    <Tag key={tag} label={tag} />
                  )
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-[10px] md:shrink-0">
              {metrics.map(({ val, lbl }) => (
                <div
                  key={lbl}
                  className="px-5 py-4 rounded-xl text-center"
                  style={{ background: 'rgba(0,0,0,0.3)' }}
                >
                  <div className="grad-text text-[26px] font-black mb-1">{val}</div>
                  <div className="text-[11px]" style={{ color: 'var(--muted)' }}>
                    {lbl}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regular cards */}
          {services.map(({ num, head, text, tags }) => (
            <div
              key={num}
              className="svc-card p-8 rounded-2xl"
              style={{ border: '1px solid var(--border)', background: 'var(--card)' }}
            >
              <div className="text-[12px] font-bold text-[var(--purple-light)] mb-[14px] tracking-[0.08em]">{num}</div>
              <div className="text-[19px] font-extrabold mb-[10px]">{head}</div>
              <div className="text-sm leading-[1.65] mb-4" style={{ color: 'var(--muted2)' }}>
                {text}
              </div>
              <div className="flex flex-wrap gap-[6px]">
                {tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
