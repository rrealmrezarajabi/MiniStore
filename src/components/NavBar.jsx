import { NavLink } from "react-router-dom";

export default function Navbar() {
  const cartCount = 0; 

  return (
    <nav className="bg-blue-700 p-4 flex justify-between items-center shadow-lg">
      <div className="text-2xl font-bold text-white tracking-wide">
        MiniStore
      </div>

      <div className="flex gap-6 items-center text-lg">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-white font-semibold"
              : "text-blue-200 hover:text-white transition"
          }
          end
        >
          Home
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive
              ? "text-white font-semibold"
              : "text-blue-200 hover:text-white transition"
          }
        >
          Products
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "text-white font-semibold"
              : "text-blue-200 hover:text-white transition"
          }
        >
          Contact
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-white font-semibold"
              : "text-blue-200 hover:text-white transition"
          }
        >
          About
        </NavLink>

        <NavLink
          to="/cart"
          className="relative bg-white text-blue-700 px-4 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-blue-100 transition"
        >
          🛒 Cart
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
            {cartCount}
          </span>
        </NavLink>
      </div>
    </nav>
  );
}
