import Hero from "../components/Hero";
import { useQuery } from "@tanstack/react-query";
import { featuredProducts } from "../api/products";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

const Home = () => {
  const { addToCart } = useCart();

  const { data, isLoading, isError } = useQuery({
    queryFn: featuredProducts,
    queryKey: ["featuredProducts"],
  });

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div>
      <Hero />

      <section className="p-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-blue-400 mb-8 text-center"
        >
          Featured Products
        </motion.h2>

        {isError && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-red-500"
          >
            Error loading products.
          </motion.p>
        )}

        {isLoading ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-blue-300"
          >
            Loading products...
          </motion.p>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {data.map((product, index) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="
                  bg-gray-800 
                  p-4 
                  rounded-xl 
                  shadow-lg 
                  flex flex-col items-center 
                  transition 
                  h-[380px] 
                  justify-between
                  border border-gray-700
                  hover:border-blue-500
                  hover:shadow-2xl
                  hover:shadow-blue-500/20
                "
              >
                <motion.img
                  src={product.image}
                  alt={product.title}
                  className="h-40 object-contain"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />

                <h3 className="font-semibold text-center line-clamp-2 text-white">
                  {product.title}
                </h3>

                <p className="text-green-400 font-bold text-xl">
                  ${product.price}
                </p>

                <div className="flex gap-3 w-full justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1"
                  >
                    <Link
                      to={`/products/${product.id}`}
                      className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-white transition-colors block text-center text-sm font-semibold"
                    >
                      View Details
                    </Link>
                  </motion.div>

                  <motion.button
                    onClick={() => addToCart(product)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg text-white cursor-pointer transition-colors flex-1 text-sm font-semibold"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default Home;
