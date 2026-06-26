/**
 * Registry of products and their legal documents.
 *
 * Each product gets a set of pages under `/products/<slug>/...`:
 *   - /products/<slug>/privacy-policy
 *   - /products/<slug>/terms-of-use
 *   - /products/<slug>/support
 *
 * To add a new product, add an entry below. The key is the URL slug
 * (lowercase, used in the path), `name` is the human-readable app name.
 *
 * `privacyPolicyId` / `termsOfUseId` are Termly policy IDs (the `data-id`
 * value from the Termly embed). Omit one to make that page return 404 for
 * the product.
 */

export type Product = {
  /** Human-readable app name, e.g. "QuietKin". */
  name: string;
  /** Termly policy ID for the privacy policy. Omit if the app has none yet. */
  privacyPolicyId?: string;
  /** Termly policy ID for the terms of use. Omit if the app has none yet. */
  termsOfUseId?: string;
  /** Support contact email shown on the support page. */
  supportEmail: string;
  /** Optional response-time line shown on the support page. */
  supportResponseTime?: string;
};

export const products = {
  quietkin: {
    name: 'Quietkin',
    // TODO: replace with QuietKin's real Termly policy IDs.
    privacyPolicyId: 'a34b96ee-7951-4ae6-9b16-7bad0270ea94',
    termsOfUseId: '6c08cbfa-4bf2-4809-a221-3dacfd6212cf',
    supportEmail: 'development@crazyops.io',
    supportResponseTime: 'We usually respond within 1–3 business days.',
  },
} satisfies Record<string, Product>;

export type ProductSlug = keyof typeof products;

export function getProduct(slug: string): Product | undefined {
  return (products as Record<string, Product>)[slug];
}

export function getProductSlugs(): string[] {
  return Object.keys(products);
}
