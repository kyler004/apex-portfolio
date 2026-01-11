import React from "react";
import { testimonials } from "../data";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 px-6 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black">Client Love</h2>
          <p className="text-xl text-slate-400">what our client say about us</p>
        </motion.div>
        <div className="relative overflow-hidden">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-slate-900 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-slate-900 to-transparent z-10" />

          <div className="flex">
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: "-50%" }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex gap-8 px-4"
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={index}
                  className="w-[400px] shrink-0 p-8 bg-slate-800/50 border border-slate-700 rounded-2xl hover:border-purple-500 transition-colors"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-500 text-yellow-500"
                      ></Star>
                    ))}
                  </div>
                  <p className="text-lg text-slate-300 mb-6 leading-relaxed line-clamp-4">
                    "{testimonial.quote}"
                  </p>
                  <div className="">
                    <div className="font-bold">{testimonial.author}</div>
                    <div className="text-slate-400 text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
