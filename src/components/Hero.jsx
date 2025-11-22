import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="
        h-[70vh]
        flex flex-col items-center justify-center
        text-center relative overflow-hidden
        bg-gradient-to-br from-blue-700/60 to-indigo-800/60
        backdrop-blur-xl rounded-lg shadow-2xl p-10
      "
    >
      <div className="absolute w-72 h-72 bg-blue-500/30 blur-[120px] rounded-full -top-10 -left-10"></div>
      <div className="absolute w-72 h-72 bg-indigo-500/30 blur-[120px] rounded-full -bottom-10 -right-10"></div>

      <h1 className="text-5xl font-extrabold mb-4 drop-shadow-xl text-white animate-fade-in">
        Welcome to Mini Store
      </h1>

      <p className="text-lg max-w-xl mb-8 text-white/90 animate-fade-in delay-200">
        Discover the best products at the best prices. Fast, simple, and modern
        shopping experience.
      </p>

      <Link
        to="/products"
        className="
          bg-white/20 hover:bg-white/30 
          px-8 py-3 rounded-xl 
          text-white text-xl font-semibold 
          shadow-lg backdrop-blur-md
          transition-all duration-300 hover:scale-105
        "
      >
        Shop Now
      </Link>
    </section>
  );
};

export default Hero;
