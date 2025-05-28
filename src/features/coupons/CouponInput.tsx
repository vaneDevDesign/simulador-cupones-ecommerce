import { useState } from "react";
import { coupons } from "../../data/coupons";
import { validateCoupon } from "../../lib/couponValidator";
import type { CartItem } from "../../types/Cart";
import type { Coupon } from "../../types/Coupon";

interface Props {
  cart: CartItem[];
  onApply: (coupon: Coupon | null) => void;
}

export default function CouponInput({ cart, onApply }: Props) {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleApply = () => {
    const found = coupons.find(
      (c) => c.code.toLowerCase() === input.toLowerCase()
    );

    if (!found) {
      setMessage("Cupón no encontrado.");
      setIsError(true);
      onApply(null);
      return;
    }

    const result = validateCoupon(cart, found);

    if (!result.valid) {
      setMessage(result.message);
      setIsError(true);
      onApply(null);
      return;
    }

    onApply(found);
    setMessage("Cupón aplicado correctamente.");
    setIsError(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Enter coupon"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border px-3 py-1.5 text-sm rounded"
        />
        <button
          className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm"
          onClick={handleApply}
        >
          Apply
        </button>
      </div>

      {message && (
        <p className={`text-sm ${isError ? "text-red-500" : "text-green-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
