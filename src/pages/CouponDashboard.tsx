import { useState } from "react";
import { coupons as initialCoupons } from "../data/coupons";
import { Link } from "react-router-dom";
import type { Coupon } from "../types/Coupon";

export default function CouponDashboard() {
  const [search, setSearch] = useState("");
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

  const filteredCoupons = coupons.filter((coupon) =>
    coupon.code.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (dateStr?: string) =>
    dateStr ? new Date(dateStr).toLocaleDateString("es-CO") : "—";

  const getStatus = (coupon: Coupon) => {
    const now = new Date();
    if (coupon.expiresAt && new Date(coupon.expiresAt) < now) return "Expirado";
    return "Activo";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Coupon Dashboard</h1>
        <div className="flex gap-2">
          <Link
            to="/"
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded text-sm shadow hover:bg-gray-300"
          >
            Volver al Home
          </Link>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-4 py-2 w-full max-w-sm rounded text-sm"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 mt-4 text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">Codigo</th>
              <th className="px-4 py-2">Tipo de descuento</th>
              <th className="px-4 py-2">Aplicado a </th>
              <th className="px-4 py-2">Reward</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Fechas</th>
              <th className="px-4 py-2">Usage</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoupons.map((coupon) => (
              <tr key={coupon.code} className="border-t border-gray-200">
                <td className="px-4 py-2 font-medium">{coupon.code}</td>
                <td className="px-4 py-2">{coupon.discountType}</td>
                <td className="px-4 py-2">{coupon.appliesTo}</td>
                <td className="px-4 py-2">
                  {coupon.discountType === "percentage"
                    ? `${coupon.discountValue}%`
                    : coupon.discountType === "fixed"
                    ? `$${coupon.discountValue}`
                    : "—"}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      getStatus(coupon) === "Expirado"
                        ? "bg-gray-200 text-gray-600"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {getStatus(coupon)}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {formatDate(coupon.startsAt)} - {formatDate(coupon.expiresAt)}
                </td>
                <td className="px-4 py-2">
                  {coupon.usedCount ?? 0}{" "}
                  {coupon.usageLimit ? `/ ${coupon.usageLimit}` : "∞"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
