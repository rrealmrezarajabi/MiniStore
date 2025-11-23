import { createContext, useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartitems");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartitems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);

      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });

    setModalMessage(`${product.title} added to cart!`);
    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  const increaseQty = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  const decreaseQty = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    showModal,
    modalMessage,
    clearCart,
    increaseQty,
    decreaseQty,
  };

  return (
    <CartContext.Provider value={value}>
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className="fixed top-4 right-4 bg-linear-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-lg shadow-2xl z-50 border border-green-400/30 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 400 }}
              className="flex items-center gap-2"
            >
              <span className="text-xl">✓</span>
              <span className="font-semibold">{modalMessage}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  return useContext(CartContext);
}
