import { useQuery } from "@tanstack/react-query";
import { productsDetails } from "../api/products";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productsDetails(id),
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  if (isLoading)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-blue-400 text-2xl mt-20"
      >
        Loading product...
      </motion.div>
    );

  if (isError)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-red-400 text-2xl mt-20"
      >
        {error.message}
      </motion.div>
    );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-10 text-center flex flex-col items-center"
    >
      <motion.img
        variants={itemVariants}
        src={data.image}
        alt={data.title}
        className="h-60 object-contain mx-auto mb-6"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
      />

      <motion.h1
        variants={itemVariants}
        className="text-3xl md:text-4xl font-bold text-blue-400 mb-4"
      >
        {data.title}
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="text-gray-300 mb-4 max-w-2xl mx-auto leading-relaxed"
      >
        {data.description}
      </motion.p>

      <motion.p
        variants={itemVariants}
        className="text-green-400 text-2xl font-bold mb-6"
      >
        Price: ${data.price}
      </motion.p>

      <motion.div variants={itemVariants} className="flex gap-4 mt-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/products"
            className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg transition-colors"
          >
            ← Back to Products
          </Link>
        </motion.div>

        <motion.button
          onClick={() => addToCart(data)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-lg transition-colors cursor-pointer"
        >
          Add to Cart
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ProductDetails;
