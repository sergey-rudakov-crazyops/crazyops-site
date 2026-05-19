import type { Metadata } from 'next';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Drumzy Support — CrazyOps',
  description:
    'Support page for the Drumzy app. Get help, ask questions, or report a problem.',
  robots: { index: true, follow: false },
};

export default function DrumzySupportPage() {
  return (
    <>
      <Nav />
      <main className="px-5 pt-[120px] pb-16 md:px-10 md:pt-[140px] md:pb-24">
        <div className="max-w-[760px] mx-auto">
          <div className="mb-10">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--purple-light)] mb-[14px] block">
              App Support
            </span>
            <h1
              className="font-black leading-[1.08] tracking-[-0.025em]"
              style={{ fontSize: 'clamp(26px, 4vw, 44px)' }}
            >
              Drumzy Support
            </h1>
          </div>

          <div
            className="p-6 md:p-10 rounded-2xl"
            style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
          >
            <p
              className="text-[16px] md:text-[17px] leading-relaxed mb-8"
              style={{ color: 'var(--muted2)' }}
            >
              If you need help with Drumzy, have questions, or want to report a
              problem, contact us:
            </p>

            <div className="mb-8">
              <div
                className="text-[11px] font-bold uppercase tracking-[0.16em] mb-2"
                style={{ color: 'var(--muted)' }}
              >
                Email
              </div>
              <a
                href="mailto:development@crazyops.io"
                className="cta-email text-[18px] md:text-[20px] font-semibold px-5 py-4 rounded-xl"
                style={{ border: '1px solid var(--border)', background: 'var(--bg2)' }}
              >
                development@crazyops.io
              </a>
            </div>

            <p
              className="text-[14px] md:text-[15px] leading-relaxed"
              style={{ color: 'var(--muted)' }}
            >
              We usually respond within 1–3 business days.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
