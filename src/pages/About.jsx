import profile from "../assets/me.jpg";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

export default function About() {
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-[80vh] flex flex-col items-center justify-center text-white p-4 sm:p-6 md:p-8"
    >
      <motion.img
        variants={itemVariants}
        src={profile}
        alt="Profile"
        className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover shadow-lg mb-4 sm:mb-6 border-4 border-blue-500"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
      />

      <motion.h1
        variants={itemVariants}
        className="text-2xl sm:text-3xl font-bold text-blue-400 mb-2 text-center px-4"
      >
        Mohamad Reza Rajabi
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="text-gray-300 max-w-xl text-center mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base px-4"
      >
        Mini Store is a React project built for learning purposes. It
        demonstrates routing, state management with Context, API handling, and
        modern UI using Tailwind CSS.
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="flex gap-4 sm:gap-6 text-2xl sm:text-3xl"
      >
        <motion.a
          href="https://github.com/rrealmrezarajabi"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2, y: -5 }}
          whileTap={{ scale: 0.9 }}
          className="text-gray-300 hover:text-white transition-colors"
        >
          <FaGithub />
        </motion.a>

        <motion.a
          href="https://www.linkedin.com/in/mohamad-reza-rajabi-781678374/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2, y: -5 }}
          whileTap={{ scale: 0.9 }}
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          <FaLinkedin />
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
