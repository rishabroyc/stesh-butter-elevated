import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  addCartLine,
  createCart,
  getCart,
  removeCartLine,
  updateCartLine,
} from "@/lib/shopify";
import type { Cart } from "@/lib/shopify";

const CART_ID_KEY = "stesh_cart_id";

type CartContextValue = {
  cart: Cart | null;
  loading: boolean;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addToCart: (variantId: string, quantity: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const cartId = localStorage.getItem(CART_ID_KEY);
    if (!cartId) return;
    getCart(cartId).then((c) => {
      if (c) setCart(c);
      else localStorage.removeItem(CART_ID_KEY);
    });
  }, []);

  const addToCart = useCallback(
    async (variantId: string, quantity: number) => {
      setLoading(true);
      try {
        const cartId = localStorage.getItem(CART_ID_KEY);
        let newCart: Cart;
        if (cartId && cart) {
          newCart = await addCartLine(cartId, variantId, quantity);
        } else {
          newCart = await createCart(variantId, quantity);
          localStorage.setItem(CART_ID_KEY, newCart.id);
        }
        setCart(newCart);
        setDrawerOpen(true);
      } finally {
        setLoading(false);
      }
    },
    [cart],
  );

  const updateQuantity = useCallback(async (lineId: string, quantity: number) => {
    const cartId = localStorage.getItem(CART_ID_KEY);
    if (!cartId) return;
    setLoading(true);
    try {
      setCart(await updateCartLine(cartId, lineId, quantity));
    } finally {
      setLoading(false);
    }
  }, []);

  const removeItem = useCallback(async (lineId: string) => {
    const cartId = localStorage.getItem(CART_ID_KEY);
    if (!cartId) return;
    setLoading(true);
    try {
      setCart(await removeCartLine(cartId, lineId));
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        drawerOpen,
        openDrawer: () => setDrawerOpen(true),
        closeDrawer: () => setDrawerOpen(false),
        addToCart,
        updateQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
