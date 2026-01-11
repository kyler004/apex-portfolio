import React from "react";
import { ArrowRight } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-900/20 via-slate-950 to-pink-900/20" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/30 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto text-center">
        <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
          We Create
          <span className="block bg-linear-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
            Bold Experiences
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto">
          A creative agency that transforms ambitious ideas into powerful
          digital products that users love.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="group px-8 py-4 bg-linear-to-r from-purple-600 to-pink-600 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2">
            Start Your Project
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 border-2 border-slate-700 rounded-full font-bold text-lg hover:border-purple-500 transition-all">
            View Our Work
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
