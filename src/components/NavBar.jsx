import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const linkVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const cartBadgeVariants = {
    initial: { scale: 0 },
    animate: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-800 p-4 flex justify-between items-center shadow-xl border-b border-white/10 sticky top-0 z-50 backdrop-blur-sm"
    >
      <motion.div
        className="text-2xl font-bold text-white tracking-wide"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
          MiniStore
        </span>
      </motion.div>

      <div className="flex gap-6 items-center text-lg">
        <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-white font-semibold relative"
                : "text-blue-200 hover:text-white transition-colors relative"
            }
            end
          >
            {({ isActive }) => (
              <>
                Home
                {isActive && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-300"
                    layoutId="activeIndicator"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </>
            )}
          </NavLink>
        </motion.div>

        <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? "text-white font-semibold relative"
                : "text-blue-200 hover:text-white transition-colors relative"
            }
          >
            {({ isActive }) => (
              <>
                Products
                {isActive && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-300"
                    layoutId="activeIndicator"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </>
            )}
          </NavLink>
        </motion.div>

        <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-white font-semibold relative"
                : "text-blue-200 hover:text-white transition-colors relative"
            }
          >
            {({ isActive }) => (
              <>
                Contact
                {isActive && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-300"
                    layoutId="activeIndicator"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </>
            )}
          </NavLink>
        </motion.div>

        <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-white font-semibold relative"
                : "text-blue-200 hover:text-white transition-colors relative"
            }
          >
            {({ isActive }) => (
              <>
                About
                {isActive && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-300"
                    layoutId="activeIndicator"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </>
            )}
          </NavLink>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <NavLink
            to="/cart"
            className="relative bg-white text-blue-700 px-4 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-blue-100 transition-colors"
          >
            🛒 Cart
            <AnimatePresence mode="wait">
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  variants={cartBadgeVariants}
                  initial="initial"
                  animate="animate"
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5 font-bold shadow-lg"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        </motion.div>
      </div>
    </motion.nav>
  );
}
