const stats = [
  { val: '120+', lbl: 'Apps shipped' },
  { val: '4.8★', lbl: 'Average store rating' },
  { val: '98%', lbl: 'On-time delivery' },
  { val: '8yr', lbl: 'In the industry' },
];

function PhoneMockup({ emoji, center = false }: { emoji: string; center?: boolean }) {
  return (
    <div
      className="rounded-[28px] overflow-hidden shrink-0"
      style={{
        width: center ? 180 : 160,
        height: center ? 340 : 300,
        borderRadius: center ? 32 : 28,
        border: '1.5px solid rgba(255,255,255,0.12)',
        background: 'var(--bg3)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
        transform: center ? 'translateY(-20px)' : undefined,
      }}
    >
      <div className="w-[60px] h-2 rounded mt-[14px] mx-auto" style={{ background: 'rgba(255,255,255,0.08)' }} />
      <div
        className="mx-[10px] mt-3 rounded-2xl flex flex-col items-center justify-center gap-2 p-4"
        style={{
          background: 'linear-gradient(145deg, rgba(124,92,252,0.25), rgba(244,114,182,0.15))',
          height: 'calc(100% - 60px)',
        }}
      >
        <span className="text-[32px]">{emoji}</span>
        <div className="w-4/5 h-[6px] rounded-sm" style={{ background: 'linear-gradient(90deg, #7c5cfc, #f472b6)' }} />
        <div className="w-4/5 h-[6px] rounded-sm" style={{ background: 'rgba(255,255,255,0.12)' }} />
        <div className="w-[55%] h-[6px] rounded-sm" style={{ background: 'rgba(255,255,255,0.12)' }} />
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 pt-[160px] pb-20 relative overflow-hidden">
      {/* Glows */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124,92,252,0.18) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -55%)',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(244,114,182,0.12) 0%, transparent 70%)',
          top: '60%',
          right: '10%',
        }}
      />

      {/* Badge */}
      <div
        className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--purple-light)] mb-7 px-4 py-[7px] rounded-full"
        style={{
          background: 'rgba(124,92,252,0.12)',
          border: '1px solid rgba(124,92,252,0.25)',
        }}
      >
        <span className="badge-dot w-[6px] h-[6px] rounded-full bg-[var(--purple-light)]" />
        Available for new projects · 2026
      </div>

      <h1
        className="font-black leading-[0.95] tracking-[-0.035em] mb-6"
        style={{ fontSize: 'clamp(38px, 7vw, 86px)' }}
      >
        We Build Apps
        <br />
        <span className="grad-text">People Love</span>
      </h1>

      <p
        className="text-[var(--muted2)] leading-[1.7] max-w-[560px] mx-auto mb-10"
        style={{ fontSize: 'clamp(15px, 2vw, 18px)' }}
      >
        A tight-knit team of mobile engineers, product designers, and growth strategists turning bold ideas into apps
        that users actually stick around for.
      </p>

      <div className="flex gap-3 justify-center flex-wrap mb-16">
        <a href="#contact" className="btn-grad text-[15px] font-bold px-8 py-[15px] rounded-full">
          Start Your Project →
        </a>
        <a href="#services" className="btn-ghost text-[15px] font-semibold px-7 py-[15px] rounded-full">
          Explore Services
        </a>
      </div>

      {/* Phone mockups */}
      <div className="relative flex items-end justify-center mb-16" style={{ gap: 16 }}>
        <div className="hidden sm:block"><PhoneMockup emoji="🎵" /></div>
        <PhoneMockup emoji="🛒" center />
        <div className="hidden sm:block"><PhoneMockup emoji="🏋️" /></div>
      </div>

      {/* Stats */}
      <div className="flex gap-12 justify-center flex-wrap">
        {stats.map(({ val, lbl }) => (
          <div key={lbl} className="text-center">
            <div className="grad-text font-black mb-1" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>
              {val}
            </div>
            <div className="text-[13px]" style={{ color: 'var(--muted)' }}>
              {lbl}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
