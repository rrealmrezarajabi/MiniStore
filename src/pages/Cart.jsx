import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
  const { cartItems, removeFromCart, clearCart, decreaseQty, increaseQty } =
    useCart();
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      x: 50,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  if (cartItems.length === 0)
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center text-gray-300 text-2xl mt-20"
      >
        Your cart is empty 🛒
      </motion.div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-10"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl text-blue-400 font-bold mb-10"
      >
        Your Cart
      </motion.h1>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <AnimatePresence mode="popLayout">
          {cartItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              exit="exit"
              whileHover={{ scale: 1.02, x: 5 }}
              className="flex items-center justify-between bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors"
            >
              <div className="flex items-center gap-4 w-2/3">
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="h-20 w-20 object-contain rounded-md bg-gray-900"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                />
                <h2 className="text-lg font-semibold text-white leading-tight max-w-[300px]">
                  {item.title}
                </h2>
              </div>

              <div className="flex items-center gap-6">
                <p className="text-gray-100 font-bold whitespace-nowrap">
                  Price : ${item.price}
                </p>
                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={() => decreaseQty(item.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded cursor-pointer"
                  >
                    -
                  </motion.button>

                  <motion.span
                    key={item.quantity}
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                    className="text-white font-semibold min-w-[30px] text-center"
                  >
                    {item.quantity}
                  </motion.span>

                  <motion.button
                    onClick={() => increaseQty(item.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded cursor-pointer"
                  >
                    +
                  </motion.button>
                </div>

                <motion.button
                  onClick={() => removeFromCart(item.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg cursor-pointer"
                >
                  Remove
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-10 text-right flex justify-center gap-4 items-center"
      >
        <motion.button
          onClick={() => clearCart()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2 cursor-pointer text-white font-semibold"
        >
          Clear Cart
        </motion.button>
        <motion.h2
          key={totalPrice}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="text-2xl font-bold text-green-400"
        >
          Total: ${totalPrice.toFixed(2)}
        </motion.h2>
      </motion.div>
    </motion.div>
  );
}
