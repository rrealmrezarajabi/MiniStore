import { useForm } from "react-hook-form";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    setModalMessage(`${data.name} Your message was sent.`);
    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
    }, 3000);
    reset();
  };

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-900 text-white p-4 sm:p-6"
    >
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            className="
              fixed bottom-4 left-1/2 -translate-x-1/2
              bg-blue-500/40 
              backdrop-blur-md 
              border border-blue-300/30
              text-white px-4 sm:px-6 py-2 sm:py-3 
              rounded-xl 
              shadow-xl 
              z-50
              text-sm sm:text-base
              max-w-[90%] sm:max-w-none
            "
          >
            {modalMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.h1
        variants={itemVariants}
        className="text-2xl sm:text-3xl font-bold text-blue-400 mb-4 sm:mb-6"
      >
        Contact Us
      </motion.h1>

      <motion.form
        variants={itemVariants}
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg w-full max-w-md border border-gray-700"
      >
        <motion.div variants={itemVariants} className="mb-4">
          <label className="block mb-2 font-semibold text-gray-200">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            placeholder="Enter your name"
          />
          <AnimatePresence>
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-400 text-sm mt-1"
              >
                {errors.name.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-4">
          <label className="block mb-2 font-semibold text-gray-200">
            Message
          </label>
          <textarea
            {...register("message", { required: "Message is required" })}
            className="w-full p-2 h-28 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            placeholder="Write your message..."
          ></textarea>
          <AnimatePresence>
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-400 text-sm mt-1"
              >
                {errors.message.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-blue-600 hover:bg-blue-500 w-full py-2 rounded-lg text-white font-semibold transition-colors"
        >
          Send Message
        </motion.button>
      </motion.form>
    </motion.div>
  );
}
