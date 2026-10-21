import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import PrismaticSlats from "./cinematic/PrismaticSlats";

const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="relative py-32 md:py-48 px-6 overflow-hidden"
    >
      <PrismaticSlats />
      {/* keep the copy legible over the brightest liquid */}
      <div className="absolute inset-0 bg-slate-950/45" aria-hidden />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          className="text-5xl md:text-8xl font-light mb-8 leading-[0.95] text-slate-50"
        >
          Ready to create
          <span className="block italic text-accent">something amazing?</span>
        </motion.h2>
        <p className="text-xl text-slate-200 font-light mb-12">
          Let's discuss your project and bring your vision to life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="group px-10 py-5 bg-accent text-slate-950 rounded-full font-medium text-lg hover:bg-slate-50 transition-colors duration-500 flex items-center justify-center gap-2">
            Get Started Today
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-10 py-5 border border-slate-300/60 backdrop-blur-sm rounded-full font-medium text-lg hover:border-accent hover:text-accent transition-colors duration-500">
            Schedule a Call
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
