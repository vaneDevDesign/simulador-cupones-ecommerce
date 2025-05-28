/* import type { Product } from "../../types/Product"; */
import { useState } from "react";
import { products } from "../../data/products";
import { useCart } from "../../context/useCart";

const categories = [
  { label: "Todos", value: "All" },
  { label: "Ropa", value: "Clothing" },
  { label: "Hogar", value: "Home" },
  { label: "Electrónica", value: "Electronics" },
] as const;

export default function ProductList() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]["value"]>("All");
  const { dispatch } = useCart();

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4 text-gray-900 font-bold">Productos</h2>

      {/* Filtros de categoría */}
      <div className="flex items-center gap-4 mb-6">
        {categories.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setActiveCategory(value)}
            className={`text-sm font-medium px-3 py-1 rounded-full border ${
              activeCategory === value
                ? "bg-blue-600/80 text-white"
                : "text-gray-600 border-gray-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="rounded-xl bg-gray-300/20 p-4 flex flex-col  gap-2"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-28 w-auto object-contain"
            />
            <h3 className="text-lg text-gray-900 font-bold text-left text-justify line-clamp-1">
              {product.name}
            </h3>
            <p className="text-xs text-gray-500 text-justify line-clamp-3">
              {product.description}
            </p>
            <p className="text-base font-semibold text-gray-900">
              ${product.price.toFixed(2)}
            </p>
            <button
              className="text-sm bg-blue-600/20 text-blue-500 p-2 rounded-md cursor-pointer"
              onClick={() =>
                dispatch({ type: "ADD_TO_CART", payload: product.id })
              }
            >
              Añadir al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
