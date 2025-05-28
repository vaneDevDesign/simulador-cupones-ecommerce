import { useState } from "react";
import CouponInput from "../coupons/CouponInput";
import type { Coupon } from "../../types/Coupon";
import { products } from "../../data/products";
import { useCart } from "../../context/useCart";

export default function Cart() {
  const { state, dispatch } = useCart();
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const cartItemsDetailed = state.cart.map((item) => {
    const product = products.find((p) => p.id === item.productId)!;
    return {
      ...product,
      quantity: item.quantity,
      subtotal: product.price * item.quantity,
    };
  });

  const total = cartItemsDetailed.reduce((acc, item) => acc + item.subtotal, 0);

  const discount =
    appliedCoupon?.discountType === "percentage"
      ? (total * appliedCoupon.discountValue) / 100
      : appliedCoupon?.discountType === "fixed"
      ? appliedCoupon.discountValue
      : appliedCoupon?.discountType === "free_product"
      ? (() => {
          const mugItem = cartItemsDetailed.find(
            (item) => item.id === appliedCoupon.targetId
          );
          return mugItem ? mugItem.price : 0;
        })()
      : 0;

  const finalTotal = total - discount;

  return (
    <div className="bg-white p-4 rounded-xl shadow-md space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Carrito</h2>
        <a href="/coupons" className="text-sm text-blue-600 hover:underline">
          COUPON DASHBOARD
        </a>
      </div>

      {cartItemsDetailed.length === 0 ? (
        <p className="text-gray-500 text-sm">Tu carrito está vacío.</p>
      ) : (
        <div className="space-y-4">
          {cartItemsDetailed.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 items-center justify-between p-4 bg-slate-100 rounded-md"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-contain rounded"
              />

              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                <p className="text-xs text-gray-500">
                  ${item.price.toFixed(2)} c/u
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="px-2 py-1 border rounded text-sm"
                  onClick={() =>
                    dispatch({ type: "DECREASE", payload: item.id })
                  }
                >
                  -
                </button>
                <span className="text-sm">{item.quantity}</span>
                <button
                  className="px-2 py-1 border rounded text-sm"
                  onClick={() =>
                    dispatch({ type: "INCREASE", payload: item.id })
                  }
                >
                  +
                </button>
              </div>
            </div>
          ))}

          {/* total */}
          <div className="pt-2 border-t text-sm font-medium text-gray-800 flex justify-between">
            <span>Subtotal:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <CouponInput
            cart={state.cart}
            onApply={(coupon) => setAppliedCoupon(coupon)}
          />

          {appliedCoupon && (
            <div className="text-sm text-green-700">
              Cupón aplicado: -${discount.toFixed(2)} ({appliedCoupon.code})
            </div>
          )}

          <div className="pt-2 border-t text-sm font-medium text-gray-800 flex justify-between">
            <span>Total:</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
