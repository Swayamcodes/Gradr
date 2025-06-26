import React from "react";
import logo from "../assets/gradr-logo.png";

const Navbar = () => {
  return (
    <div className="w-full flex justify-center fixed top-0 z-50">
      <nav
        className="fixed top-2 left-1/2 -translate-x-1/2 z-50 
                   w-[92%] max-w-6xl h-20 px-6 flex items-center justify-between 
                   rounded-xl shadow-lg border border-white/10 
                   bg-black/30 backdrop-blur-md transition-all duration-300"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(17,18,20,0.4)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        
        <div className="flex items-center">
          <img
            src={logo}
            alt="Gradr Logo"
            className="h-12 object-contain w-auto rounded-lg opacity-90 backdrop-blur-sm bg-white/5 p-1"
          />
        </div>

        
        <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-6 text-sm text-neutral-300 font-medium">
          <a href="#upload" className="hover:text-white hover:scale-105 transition duration-200">
            Upload
          </a>
          <a href="#results" className="hover:text-white hover:scale-105 transition duration-200">
            Results
          </a>
          <a href="#chat" className="hover:text-white hover:scale-105 transition duration-200">
            AI Chat
          </a>
        </div>

        {/* 🔒 Placeholder Login */}
        <div>
          <button
            disabled
            className="bg-white/10 text-white text-sm px-4 py-1.5 rounded-xl 
                       hover:scale-105 transition cursor-not-allowed"
            title="Login coming soon"
          >
            Login
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
