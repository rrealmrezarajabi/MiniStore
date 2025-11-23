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
      className="p-4 sm:p-6 md:p-10"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl sm:text-3xl text-blue-400 font-bold mb-6 sm:mb-8 md:mb-10"
      >
        Your Cart
      </motion.h1>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4 sm:space-y-6"
      >
        <AnimatePresence mode="popLayout">
          {cartItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              exit="exit"
              whileHover={{ scale: 1.01, x: 2 }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-800 p-3 sm:p-4 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors gap-4"
            >
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-2/3">
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="h-16 w-16 sm:h-20 sm:w-20 object-contain rounded-md bg-gray-900 flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                />
                <h2 className="text-sm sm:text-base md:text-lg font-semibold text-white leading-tight">
                  {item.title}
                </h2>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 md:gap-6 w-full sm:w-auto">
                <p className="text-gray-100 font-bold text-sm sm:text-base">
                  ${item.price}
                </p>
                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={() => decreaseQty(item.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded cursor-pointer text-sm sm:text-base"
                  >
                    -
                  </motion.button>

                  <motion.span
                    key={item.quantity}
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                    className="text-white font-semibold min-w-[30px] text-center text-sm sm:text-base"
                  >
                    {item.quantity}
                  </motion.span>

                  <motion.button
                    onClick={() => increaseQty(item.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded cursor-pointer text-sm sm:text-base"
                  >
                    +
                  </motion.button>
                </div>

                <motion.button
                  onClick={() => removeFromCart(item.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg cursor-pointer text-sm sm:text-base w-full sm:w-auto"
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
        className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
      >
        <motion.button
          onClick={() => clearCart()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2 cursor-pointer text-white font-semibold text-sm sm:text-base w-full sm:w-auto"
        >
          Clear Cart
        </motion.button>
        <motion.h2
          key={totalPrice}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="text-xl sm:text-2xl font-bold text-green-400"
        >
          Total: ${totalPrice.toFixed(2)}
        </motion.h2>
      </motion.div>
    </motion.div>
  );
}
