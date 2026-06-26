import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Nav from '@/app/components/Nav';
import Footer from '@/app/components/Footer';
import { getProduct, getProductSlugs } from '@/products/registry';

export const dynamicParams = false;

export function generateStaticParams() {
  return getProductSlugs().map((product) => ({ product }));
}

export async function generateMetadata({
  params,
}: PageProps<'/products/[product]/support'>): Promise<Metadata> {
  const { product } = await params;
  const entry = getProduct(product);
  if (!entry) return {};
  return {
    title: `${entry.name} Support — CrazyOps`,
    description: `Support page for the ${entry.name} app. Get help, ask questions, or report a problem.`,
    robots: { index: true, follow: false },
  };
}

export default async function ProductSupportPage({
  params,
}: PageProps<'/products/[product]/support'>) {
  const { product } = await params;
  const entry = getProduct(product);

  if (!entry) {
    notFound();
  }

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
              {entry.name} Support
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
              If you need help with {entry.name}, have questions, or want to
              report a problem, contact us:
            </p>

            <div className="mb-8">
              <div
                className="text-[11px] font-bold uppercase tracking-[0.16em] mb-2"
                style={{ color: 'var(--muted)' }}
              >
                Email
              </div>
              <a
                href={`mailto:${entry.supportEmail}`}
                className="cta-email text-[18px] md:text-[20px] font-semibold px-5 py-4 rounded-xl"
                style={{ border: '1px solid var(--border)', background: 'var(--bg2)' }}
              >
                {entry.supportEmail}
              </a>
            </div>

            {entry.supportResponseTime && (
              <p
                className="text-[14px] md:text-[15px] leading-relaxed"
                style={{ color: 'var(--muted)' }}
              >
                {entry.supportResponseTime}
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
