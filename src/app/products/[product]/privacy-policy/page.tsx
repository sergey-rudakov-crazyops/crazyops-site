import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductLegalDoc from '@/app/components/ProductLegalDoc';
import { getProduct, getProductSlugs } from '@/products/registry';

export const dynamicParams = false;

export function generateStaticParams() {
  return getProductSlugs().map((product) => ({ product }));
}

export async function generateMetadata({
  params,
}: PageProps<'/products/[product]/privacy-policy'>): Promise<Metadata> {
  const { product } = await params;
  const entry = getProduct(product);
  if (!entry) return {};
  return {
    title: `Privacy Policy — ${entry.name}`,
    description: `Privacy Policy for the ${entry.name} app by CrazyOps.`,
  };
}

export default async function ProductPrivacyPolicyPage({
  params,
}: PageProps<'/products/[product]/privacy-policy'>) {
  const { product } = await params;
  const entry = getProduct(product);

  if (!entry || !entry.privacyPolicyId) {
    notFound();
  }

  return (
    <ProductLegalDoc
      title={`${entry.name} Privacy Policy`}
      policyId={entry.privacyPolicyId}
    />
  );
}
