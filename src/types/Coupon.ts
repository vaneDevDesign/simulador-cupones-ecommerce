export type CouponType =
  | "percentage"
  | "fixed"
  | "free_product"
  | "buy_x_get_y";

export type CouponScope = "all" | "category" | "product";

export interface Coupon {
  code: string;
  discountType: CouponType;
  discountValue: number;
  appliesTo: CouponScope;
  targetId?: string;
  startsAt?: string;
  expiresAt?: string;
  usageLimit?: number;
  usedCount?: number;
  userLimir?: number;
}
