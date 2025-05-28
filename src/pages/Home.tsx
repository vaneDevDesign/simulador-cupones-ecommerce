import ProductList from "../features/products/ProductList";
import Cart from "../features/cart/Cart";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-200 px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white rounded-md">
          <ProductList />
        </div>
        <div className="md:col-span-1">
          <Cart />
        </div>
      </div>
    </div>
  );
}
