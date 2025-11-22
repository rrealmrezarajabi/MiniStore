import { useForm } from "react-hook-form";
import { useState } from "react";

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

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      {showModal && (
        <div
          className="
    fixed bottom-4 left-1/2 -translate-x-1/2
    bg-blue-500/40 
    backdrop-blur-md 
    border border-blue-300/30
    text-white px-6 py-3 
    rounded-xl 
    shadow-xl 
    transition-all duration-300
    z-50
  "
        >
          {modalMessage}
        </div>
      )}
      <h1 className="text-3xl font-bold text-blue-400 mb-6">Contact Us</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md"
      >
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-200">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-200">
            Message
          </label>
          <textarea
            {...register("message", { required: "Message is required" })}
            className="w-full p-2 h-28 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Write your message..."
          ></textarea>
          {errors.message && (
            <p className="text-red-400 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 w-full py-2 rounded-lg text-white font-semibold transition-colors"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
