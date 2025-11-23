import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="
        h-[60vh] sm:h-[70vh] md:h-[80vh]
        flex flex-col items-center justify-center
        text-center relative overflow-hidden
        bg-gradient-to-br from-blue-700/80 via-indigo-800/80 to-purple-900/80
        backdrop-blur-xl rounded-2xl shadow-2xl p-4 sm:p-6 md:p-10
        border border-white/10
      "
    >
      {/* Animated background orbs */}
      <motion.div
        className="absolute w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-blue-500/40 blur-[100px] sm:blur-[120px] md:blur-[140px] rounded-full -top-10 sm:-top-20 -left-10 sm:-left-20"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-indigo-500/40 blur-[100px] sm:blur-[120px] md:blur-[140px] rounded-full -bottom-10 sm:-bottom-20 -right-10 sm:-right-20"
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-purple-500/30 blur-[80px] sm:blur-[100px] md:blur-[120px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <motion.div variants={itemVariants} className="relative z-10">
        <motion.h1
          variants={floatingVariants}
          animate="animate"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 sm:mb-6 drop-shadow-2xl text-white px-4"
        >
          Welcome to{" "}
          <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
            Mini Store
          </span>
        </motion.h1>
      </motion.div>

      <motion.p
        variants={itemVariants}
        className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl max-w-2xl mb-6 sm:mb-8 md:mb-10 text-white/95 leading-relaxed px-4"
      >
        Discover the best products at the best prices. Fast, simple, and modern
        shopping experience.
      </motion.p>

      <motion.div variants={itemVariants}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/products"
            className="
              relative
              bg-gradient-to-r from-blue-600 to-indigo-600
              hover:from-blue-500 hover:to-indigo-500
              px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl 
              text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold 
              shadow-2xl backdrop-blur-md
              transition-all duration-300
              inline-block
              overflow-hidden
              group
            "
          >
            <motion.span
              className="relative z-10"
              initial={false}
              whileHover={{ x: 5 }}
            >
              Shop Now →
            </motion.span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </Link>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-4 left-4 sm:top-10 sm:left-10 w-2 h-2 bg-yellow-400 rounded-full hidden sm:block"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-4 right-4 sm:bottom-10 sm:right-10 w-3 h-3 bg-pink-400 rounded-full hidden sm:block"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </motion.section>
  );
};

export default Hero;
