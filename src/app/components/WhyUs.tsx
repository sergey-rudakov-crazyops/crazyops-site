const cards = [
  {
    emoji: '⚡',
    head: 'Fast Iteration Cycles',
    text: 'Two-week sprints with real demos. You see progress every cycle, not just at launch.',
  },
  {
    emoji: '🎯',
    head: 'Product Thinking First',
    text: 'We push back on bad ideas (kindly) and suggest better ones. Your goals are our goals.',
  },
  {
    emoji: '🔐',
    head: 'Security & Compliance',
    text: 'GDPR-ready, App Store & Google Play compliant from day one.',
  },
  {
    emoji: '📊',
    head: 'Data-Driven UX',
    text: 'Analytics baked in from the start. Every screen is designed with conversion in mind.',
  },
  {
    emoji: '🌍',
    head: 'Cross-Platform Experts',
    text: 'Flutter, React Native, Swift, Kotlin — we pick the right tool, not the fashionable one.',
  },
  {
    emoji: '🛠️',
    head: 'Long-Term Support',
    text: "We don't disappear post-launch. Maintenance and scaling are part of the deal.",
  },
];

export default function WhyUs() {
  return (
    <section id="why" className="px-5 py-16 md:px-10 md:py-24" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="max-w-[1100px] mx-auto">
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--purple-light)] mb-[14px] block">
          Why CrazyOps
        </span>
        <h2
          className="font-black leading-[1.08] tracking-[-0.025em] mb-4"
          style={{ fontSize: 'clamp(26px, 4vw, 44px)' }}
        >
          Built different.
          <br />
          Delivered on time.
        </h2>
        <p className="text-base leading-[1.7] max-w-[520px] mb-14" style={{ color: 'var(--muted2)' }}>
          We're not a body-shop. We obsess over retention, UX, and the tiny details that separate good apps from great
          ones.
        </p>

        <div
          className="grid grid-cols-1 md:grid-cols-3 rounded-[20px] overflow-hidden"
          style={{ border: '1px solid var(--border)' }}
        >
          {cards.map(({ emoji, head, text }) => (
            <div key={head} className="why-card px-8 py-9">
              <div className="text-[32px] mb-4">{emoji}</div>
              <div className="text-base font-extrabold mb-[10px]">{head}</div>
              <div className="text-sm leading-[1.65]" style={{ color: 'var(--muted2)' }}>
                {text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
