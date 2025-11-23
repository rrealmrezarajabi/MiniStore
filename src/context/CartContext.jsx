import { createContext, useContext, useEffect, useState } from "react";

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
    }, 1500);
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
    setCartItems(
      (prevItems) =>
        prevItems
          .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0) // اگر صفر شد حذف بشه
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
      {showModal && (
        <div className="fixed top-4 right-1/10 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 ">
          {modalMessage}
        </div>
      )}

      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  return useContext(CartContext);
}
