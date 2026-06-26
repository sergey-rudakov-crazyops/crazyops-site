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
}: PageProps<'/products/[product]/terms-of-use'>): Promise<Metadata> {
  const { product } = await params;
  const entry = getProduct(product);
  if (!entry) return {};
  return {
    title: `Terms of Use — ${entry.name}`,
    description: `Terms of Use for the ${entry.name} app by CrazyOps.`,
  };
}

export default async function ProductTermsOfUsePage({
  params,
}: PageProps<'/products/[product]/terms-of-use'>) {
  const { product } = await params;
  const entry = getProduct(product);

  if (!entry || !entry.termsOfUseId) {
    notFound();
  }

  return (
    <ProductLegalDoc
      title={`${entry.name} Terms of Use`}
      policyId={entry.termsOfUseId}
    />
  );
}
