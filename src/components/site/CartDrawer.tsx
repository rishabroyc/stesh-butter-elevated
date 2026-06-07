import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart";
import shopPailImg from "@/assets/Website Pictures/Shop page/shop-pail.png";

export function CartDrawer() {
  const { cart, loading, drawerOpen, closeDrawer, updateQuantity, removeItem } = useCart();

  const total = cart ? parseFloat(cart.cost.totalAmount.amount).toFixed(2) : "0.00";
  const currency = cart?.cost.totalAmount.currencyCode ?? "USD";

  const originalSubtotal = cart
    ? cart.lines.reduce((sum, line) => sum + parseFloat(line.merchandise.price.amount) * line.quantity, 0)
    : 0;
  const actualTotal = cart ? parseFloat(cart.cost.totalAmount.amount) : 0;
  const savings = originalSubtotal - actualTotal;
  const hasSavings = savings > 0.01;

  const checkoutUrl = cart?.checkoutUrl ?? "#";

  return (
    <>
      {/* Backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-[70] bg-dark/40 backdrop-blur-sm"
          onClick={closeDrawer}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed inset-y-0 right-0 z-[80] flex w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ease-in-out ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="font-display text-2xl">Your Cart</h2>
          <button
            onClick={closeDrawer}
            aria-label="Close cart"
            className="text-dark/60 hover:text-dark transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {!cart || cart.lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
              <ShoppingBag className="h-12 w-12 text-dark/20" />
              <p className="font-display text-xl text-dark/50">Your cart is empty</p>
              <button
                onClick={closeDrawer}
                className="mt-2 border-b border-pistachio-deep pb-1 text-[11px] uppercase tracking-widest-extra text-pistachio-deep"
              >
                Continue shopping →
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {cart.lines.map((line) => (
                <li key={line.id} className="flex gap-4 py-5">
                  {/* Image */}
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-warm-tan/20">
                    {(() => {
                      const isPail = line.merchandise.title?.toLowerCase().includes("pail");
                      const imgSrc = isPail
                        ? shopPailImg
                        : (line.merchandise.product.featuredImage?.url ?? null);
                      return imgSrc ? (
                        <img
                          src={imgSrc}
                          alt={line.merchandise.product.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-warm-tan/30" />
                      );
                    })()}
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-display text-lg leading-tight">
                          {line.merchandise.product.title}
                        </p>
                        {line.merchandise.title !== "Default Title" && (
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {line.merchandise.title}
                          </p>
                        )}
                      </div>
                      <p className="font-display text-lg">
                        ${(parseFloat(line.merchandise.price.amount) * line.quantity).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Qty controls */}
                      <div className="flex items-center rounded-full border border-border">
                        <button
                          onClick={() =>
                            line.quantity === 1
                              ? removeItem(line.id)
                              : updateQuantity(line.id, line.quantity - 1)
                          }
                          disabled={loading}
                          className="p-2 disabled:opacity-40"
                          aria-label="Decrease"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{line.quantity}</span>
                        <button
                          onClick={() => updateQuantity(line.id, line.quantity + 1)}
                          disabled={loading}
                          className="p-2 disabled:opacity-40"
                          aria-label="Increase"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(line.id)}
                        disabled={loading}
                        className="text-xs text-muted-foreground hover:text-dark underline transition-colors disabled:opacity-40"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cart && cart.lines.length > 0 && (
          <div className="border-t border-border px-6 py-6">
            {hasSavings && (
              <>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Original</span>
                  <span className="font-display text-lg text-muted-foreground line-through">
                    ${originalSubtotal.toFixed(2)}
                  </span>
                </div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-pistachio-deep">Savings</span>
                  <span className="font-display text-lg text-pistachio-deep">
                    −${savings.toFixed(2)}
                  </span>
                </div>
              </>
            )}
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="font-display text-2xl">
                {currency === "USD" ? "$" : currency}
                {total}
              </span>
            </div>
            <p className="mb-4 text-center text-xs text-muted-foreground">
              Shipping & taxes calculated at checkout
            </p>
            <a
              href={checkoutUrl}
              className="flex w-full items-center justify-center gap-3 rounded-full bg-pistachio-deep px-8 py-5 text-[11px] uppercase tracking-widest-extra text-cream transition-all hover:bg-dark"
            >
              Checkout →
            </a>
          </div>
        )}
      </aside>
    </>
  );
}
