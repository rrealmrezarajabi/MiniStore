import { useQuery } from "@tanstack/react-query";
import { allProducts } from "../api/products";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const Products = () => {
  const [search, setSearch] = useState("");
  const { addToCart } = useCart();

  const { data, isLoading, isError, error } = useQuery({
    queryFn: allProducts,
    queryKey: ["allProducts"],
  });

  let filteredProducts = data?.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  if (isLoading)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-blue-400 text-2xl mt-20"
      >
        Loading products...
      </motion.div>
    );

  if (isError)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-red-400 text-2xl mt-20"
      >
        {error?.message || "Failed to load products"}
      </motion.div>
    );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex justify-center mt-4 sm:mt-6 mb-6 sm:mb-8 px-4"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search..."
          className="w-full max-w-md px-4 py-2 sm:py-3
            rounded-2xl
            bg-slate-800/60
            border border-slate-700
            text-slate-200
            placeholder-slate-400
            shadow-lg shadow-black/30
            focus:outline-none
            focus:border-blue-500
            focus:ring-2 focus:ring-blue-500/40
            transition text-sm sm:text-base"
        />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto px-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts?.map((p) => (
            <motion.div
              key={p.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              exit="exit"
              className="bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg border border-gray-700 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/20 transition-all"
            >
              <motion.img
                src={p.image}
                alt={p.title}
                className="h-40 sm:h-48 object-contain mx-auto mb-3 sm:mb-4 w-full"
                whileHover={{ scale: 1.1, rotate: 2 }}
                transition={{ duration: 0.3 }}
              />

              <h2 className="text-base sm:text-lg font-semibold text-white mb-2 truncate">
                {p.title}
              </h2>

              <div className="flex flex-col justify-center items-center">
                <p className="text-green-400 mb-3 text-lg sm:text-xl font-bold">
                  ${p.price}
                </p>

                <div className="flex gap-2 sm:gap-3 w-full">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1"
                  >
                    <Link
                      to={`/products/${p.id}`}
                      className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-2 sm:px-4 rounded-lg transition-colors block text-center text-xs sm:text-sm font-semibold"
                    >
                      View Details
                    </Link>
                  </motion.div>

                  <motion.button
                    onClick={() => addToCart(p)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-green-600 hover:bg-green-500 text-white py-2 px-2 sm:px-4 rounded-lg transition-colors cursor-pointer flex-1 text-xs sm:text-sm font-semibold"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Products;
