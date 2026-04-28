export default function Contact() {
  return (
    <section id="contact" className="px-5 pb-16 md:px-10 md:pb-24">
      <div
        className="max-w-[1100px] mx-auto rounded-3xl px-6 py-9 md:px-14 md:py-16 flex items-center justify-between gap-10 flex-wrap"
        style={{
          background: 'linear-gradient(135deg, rgba(124,92,252,0.2) 0%, rgba(244,114,182,0.15) 100%)',
          border: '1px solid rgba(124,92,252,0.25)',
        }}
      >
        <div>
          <h2
            className="font-black leading-tight tracking-[-0.02em] mb-[10px]"
            style={{ fontSize: 'clamp(24px, 3.5vw, 38px)' }}
          >
            Got an idea?
            <br />
            <span className="grad-text">Let's build it.</span>
          </h2>
          <p className="text-[15px] leading-[1.65] max-w-[400px]" style={{ color: 'var(--muted2)' }}>
            Tell us what you're building — we'll respond within 24 hours with a concrete plan, timeline, and ballpark
            budget. No pitch decks, no fluff.
          </p>
          <a
            href="mailto:sales@crazyops.io"
            className="cta-email mt-6 text-[18px] font-bold px-7 py-4 rounded-xl"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <span className="text-[22px]">✉️</span>
            info@crazyops.io
          </a>
        </div>
      </div>
    </section>
  );
}
