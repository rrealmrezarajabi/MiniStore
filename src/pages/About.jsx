import profile from "../assets/me.jpg";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-white p-8">
      <img
        src={profile}
        alt="Profile"
        className="w-40 h-40 rounded-full object-cover shadow-lg mb-6 border-4 border-blue-500"
      />

      <h1 className="text-3xl font-bold text-blue-400 mb-2">
        Mohamad Reza Rajabi
      </h1>

      <p className="text-gray-300 max-w-xl text-center mb-6">
        Mini Store is a React project built for learning purposes. It
        demonstrates routing, state management with Context, API handling, and
        modern UI using Tailwind CSS.
      </p>

      <div className="flex gap-6 text-3xl">
        <a
          href="https://github.com/rrealmrezarajabi"
          target="_blank"
          className="text-gray-300 hover:text-white transition"
        >
          <FaGithub />
        </a>

        <a
          href="https://www.linkedin.com/in/YOUR_LINKEDIN"
          target="_blank"
          className="text-blue-400 hover:text-blue-300 transition"
        >
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
}
