import type { Coupon } from "../types/Coupon";

export const coupons: Coupon[] = [
  // Porcentaje en toda la tienda
  {
    code: "WELCOME10",
    discountType: "percentage",
    discountValue: 10,
    appliesTo: "all",
  },

  // Descuento fijo en categoría
  {
    code: "VIPONLY",
    discountType: "fixed",
    discountValue: 20,
    appliesTo: "category",
    targetId: "Clothing",
  },

  // Producto gratis por comprar otro (ejemplo: cafetera → taza)
  {
    code: "CAFEGRATIS",
    discountType: "free_product",
    discountValue: 0,
    appliesTo: "product",
    targetId: "prod-8", // ID de la taza
  },

  // Fecha de expiración simulada
  {
    code: "HOYSOLO",
    discountType: "percentage",
    discountValue: 15,
    appliesTo: "all",
    expiresAt: "2024-12-31T23:59:59.000Z",
  },

  // Límite de uso global
  {
    code: "LIMITADO5",
    discountType: "fixed",
    discountValue: 5,
    appliesTo: "all",
    usageLimit: 5,
    usedCount: 0,
  },

  // Cupón de una sola categoría
  {
    code: "ELECTRO20",
    discountType: "percentage",
    discountValue: 20,
    appliesTo: "category",
    targetId: "Electronics",
  },
  // 80% porciento
  {
    code: "BlackFriday",
    discountType: "percentage",
    discountValue: 80,
    appliesTo: "all",
  },
];
