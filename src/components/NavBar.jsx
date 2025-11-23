import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const { cartItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const mobileItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-800 p-4 shadow-xl border-b border-white/10 sticky top-0 z-50 backdrop-blur-sm"
    >
      <div className="flex justify-between items-center">
        <motion.div
          className="text-xl md:text-2xl font-bold text-white tracking-wide"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
            MiniStore
          </span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 lg:gap-6 items-center text-base lg:text-lg">
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
              className="relative bg-white text-blue-700 px-3 lg:px-4 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-blue-100 transition-colors text-sm lg:text-base"
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

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-white text-2xl"
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-white/20">
              <motion.div variants={mobileItemVariants}>
                <NavLink
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-white font-semibold block py-2"
                      : "text-blue-200 hover:text-white transition-colors block py-2"
                  }
                  end
                >
                  Home
                </NavLink>
              </motion.div>

              <motion.div variants={mobileItemVariants}>
                <NavLink
                  to="/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-white font-semibold block py-2"
                      : "text-blue-200 hover:text-white transition-colors block py-2"
                  }
                >
                  Products
                </NavLink>
              </motion.div>

              <motion.div variants={mobileItemVariants}>
                <NavLink
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-white font-semibold block py-2"
                      : "text-blue-200 hover:text-white transition-colors block py-2"
                  }
                >
                  Contact
                </NavLink>
              </motion.div>

              <motion.div variants={mobileItemVariants}>
                <NavLink
                  to="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-white font-semibold block py-2"
                      : "text-blue-200 hover:text-white transition-colors block py-2"
                  }
                >
                  About
                </NavLink>
              </motion.div>

              <motion.div variants={mobileItemVariants}>
                <NavLink
                  to="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative bg-white text-blue-700 px-4 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-blue-100 transition-colors w-fit"
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
