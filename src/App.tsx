import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CouponDashboard from "./pages/CouponDashboard";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coupons" element={<CouponDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
