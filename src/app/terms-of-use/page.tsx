import type { Metadata } from 'next';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import TermlyEmbed from '../components/TermlyEmbed';

export const metadata: Metadata = {
  title: 'Terms of Use — CrazyOps',
  description: 'Terms of Use for the CrazyOps website and services.',
};

export default function TermsOfUsePage() {
  return (
    <>
      <Nav />
      <main className="px-5 pt-[120px] pb-16 md:px-10 md:pt-[140px] md:pb-24">
        <div className="max-w-[1100px] mx-auto">
          <div className="mb-10">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--purple-light)] mb-[14px] block">
              Legal Document
            </span>
            <h1
              className="font-black leading-[1.08] tracking-[-0.025em]"
              style={{ fontSize: 'clamp(26px, 4vw, 44px)' }}
            >
              Terms of Use
            </h1>
          </div>
          <div
            className="p-6 md:p-10 rounded-2xl bg-white text-black"
            style={{ border: '1px solid var(--border)' }}
          >
            <TermlyEmbed policyId="4762211f-8082-4770-846e-41a4190a87fe" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
