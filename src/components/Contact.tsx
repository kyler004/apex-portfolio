import React from "react";
import { ArrowRight } from "lucide-react";

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 px-6 bg-slate-900/50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl md:text-7xl font-black mb-6">
          Ready to Create
          <span className="block bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Something Amazing?
          </span>
        </h2>
        <p className="text-xl text-slate-300 mb-12">
          Let's discuss your project and bring your vision to life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="group px-10 py-5 bg-linear-to-r from-purple-600 to-pink-600 rounded-full font-bold text-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2">
            Get Started Today
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-10 py-5 border-2 border-slate-700 rounded-full font-bold text-xl hover:border-purple-500 transition-all">
            Schedule a Call
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
