const DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN as string;
const TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN as string;
const API_URL = `https://${DOMAIN}/api/2025-01/graphql.json`;

export type CartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: { amount: string; currencyCode: string };
    product: {
      title: string;
      handle: string;
      featuredImage: { url: string } | null;
    };
  };
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: CartLine[];
  cost: {
    totalAmount: { amount: string; currencyCode: string };
  };
};

export type ShopifyVariant = {
  id: string;
  title: string;
  price: { amount: string; currencyCode: string };
  availableForSale: boolean;
};

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  lines(first: 20) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount currencyCode }
            product {
              title
              handle
              featuredImage { url }
            }
          }
        }
      }
    }
  }
  cost {
    totalAmount { amount currencyCode }
  }
`;

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data as T;
}

function normalizeCart(raw: Record<string, unknown>): Cart {
  const lines = (raw.lines as { edges: { node: CartLine }[] }).edges.map((e) => e.node);
  return { ...(raw as Omit<Cart, "lines">), lines };
}

export async function getProductVariants(handle: string): Promise<ShopifyVariant[]> {
  const data = await shopifyFetch<{ product: { variants: { edges: { node: ShopifyVariant }[] } } | null }>(
    `query GetProduct($handle: String!) {
      product(handle: $handle) {
        variants(first: 10) {
          edges {
            node {
              id
              title
              price { amount currencyCode }
              availableForSale
            }
          }
        }
      }
    }`,
    { handle },
  );
  return data.product?.variants.edges.map((e) => e.node) ?? [];
}

export async function getFirstProduct(): Promise<{ id: string; handle: string; variants: ShopifyVariant[] } | null> {
  const data = await shopifyFetch<{
    products: { edges: { node: { id: string; handle: string; variants: { edges: { node: ShopifyVariant }[] } } }[] };
  }>(
    `query {
      products(first: 1) {
        edges {
          node {
            id
            handle
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price { amount currencyCode }
                  availableForSale
                }
              }
            }
          }
        }
      }
    }`,
  );
  const node = data.products?.edges[0]?.node;
  if (!node) return null;
  return { id: node.id, handle: node.handle, variants: node.variants.edges.map((e) => e.node) };
}

export async function createCart(variantId: string, quantity: number): Promise<Cart> {
  const data = await shopifyFetch<{ cartCreate: { cart: Record<string, unknown> } }>(
    `mutation CreateCart($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart { ${CART_FIELDS} }
      }
    }`,
    { lines: [{ merchandiseId: variantId, quantity }] },
  );
  return normalizeCart(data.cartCreate.cart);
}

export async function addCartLine(cartId: string, variantId: string, quantity: number): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: Record<string, unknown> } }>(
    `mutation AddCartLine($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ${CART_FIELDS} }
      }
    }`,
    { cartId, lines: [{ merchandiseId: variantId, quantity }] },
  );
  return normalizeCart(data.cartLinesAdd.cart);
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: Record<string, unknown> } }>(
    `mutation UpdateCartLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ${CART_FIELDS} }
      }
    }`,
    { cartId, lines: [{ id: lineId, quantity }] },
  );
  return normalizeCart(data.cartLinesUpdate.cart);
}

export async function removeCartLine(cartId: string, lineId: string): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: Record<string, unknown> } }>(
    `mutation RemoveCartLine($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ${CART_FIELDS} }
      }
    }`,
    { cartId, lineIds: [lineId] },
  );
  return normalizeCart(data.cartLinesRemove.cart);
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<{ cart: Record<string, unknown> | null }>(
    `query GetCart($cartId: ID!) {
      cart(id: $cartId) { ${CART_FIELDS} }
    }`,
    { cartId },
  );
  return data.cart ? normalizeCart(data.cart) : null;
}
