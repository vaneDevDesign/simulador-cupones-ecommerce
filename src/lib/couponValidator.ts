import type { CartItem } from "../types/Cart";
import type { Coupon } from "../types/Coupon";
import { products } from "../data/products";

export function validateCoupon(cart: CartItem[], coupon: Coupon) {
  const now = new Date();

  // Validar fechas
  if (coupon.startsAt && new Date(coupon.startsAt) > now) {
    return { valid: false, message: "El cupón aún no está activo." };
  }

  if (coupon.expiresAt && new Date(coupon.expiresAt) < now) {
    return { valid: false, message: "El cupón ha expirado." };
  }

  // Validar uso global
  if (
    typeof coupon.usageLimit === "number" &&
    typeof coupon.usedCount === "number" &&
    coupon.usedCount >= coupon.usageLimit
  ) {
    return {
      valid: false,
      message: "El cupón ya ha alcanzado su límite de uso.",
    };
  }

  // Validar si aplica al carrito según su alcance (scope)
  if (coupon.appliesTo === "product" && coupon.targetId) {
    const hasProduct = cart.some((item) => item.productId === coupon.targetId);
    if (!hasProduct) {
      return {
        valid: false,
        message: "Debes tener el producto requerido en el carrito.",
      };
    }
  }

  if (coupon.appliesTo === "category" && coupon.targetId) {
    const hasCategory = cart.some((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product?.category === coupon.targetId;
    });
    if (!hasCategory) {
      return {
        valid: false,
        message: "No tienes productos de la categoría requerida.",
      };
    }
  }
  if (coupon.code === "CAFEGRATIS") {
    const hasCoffee = cart.some((item) => item.productId === "prod-7");
    const hasMug = cart.some((item) => item.productId === coupon.targetId);

    if (!hasCoffee || !hasMug) {
      return {
        valid: false,
        message: "Debes tener una cafetera y una taza en el carrito",
      };
    }
  }

  return { valid: true, message: "Cupón válido y aplicable." };
}
