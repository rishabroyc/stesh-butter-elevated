/**
 * Meta Commerce Manager checkout redirect handler.
 *
 * In Meta Commerce Manager → Settings → General → Checkout Method,
 * set the Checkout URL to:
 *   https://steshbutter.com/api/meta-checkout
 *
 * Meta appends ?products=variantId:qty,variantId:qty and optionally ?coupon=CODE.
 * The IDs are plain numeric Shopify variant IDs (Meta's standard for Shopify catalogs).
 * If your catalog uses a different ID scheme, update toVariantGid() below.
 */

import { createCartWithLines, applyDiscountCode } from "./shopify";

const HOME = "https://steshbutter.com";

function toVariantGid(id: string): string {
  return `gid://shopify/ProductVariant/${id}`;
}

export async function handleMetaCheckout(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const productsParam = url.searchParams.get("products");
  const coupon = url.searchParams.get("coupon");

  if (!productsParam) {
    console.warn("[meta-checkout] Missing products param — redirecting home");
    return Response.redirect(HOME, 302);
  }

  let lines: Array<{ variantId: string; quantity: number }>;
  try {
    lines = productsParam.split(",").map((entry) => {
      const [id, qty] = entry.trim().split(":");
      if (!id || !qty) throw new Error(`Malformed entry: "${entry}"`);
      const quantity = parseInt(qty, 10);
      if (isNaN(quantity) || quantity < 1) throw new Error(`Invalid qty in: "${entry}"`);
      return { variantId: toVariantGid(id), quantity };
    });
  } catch (err) {
    console.error("[meta-checkout] Failed to parse products param:", productsParam, err);
    return Response.redirect(HOME, 302);
  }

  try {
    let cart = await createCartWithLines(lines);

    if (coupon) {
      try {
        cart = await applyDiscountCode(cart.id, coupon);
      } catch (err) {
        console.warn("[meta-checkout] Discount code failed, proceeding without it:", err);
      }
    }

    return Response.redirect(cart.checkoutUrl, 302);
  } catch (err) {
    console.error("[meta-checkout] Cart creation failed:", err);
    return Response.redirect(HOME, 302);
  }
}
