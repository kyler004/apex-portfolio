import React from "react";
import { services } from "../data";
import { motion } from "framer-motion";

const Services: React.FC = () => (
  <section id="services" className="py-20 px-6 bg-slate-900/50">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-black mb-4">What we do</h2>
        <p className="text-xl text-slate-400">
          Full-service solutions for modern brands
        </p>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -10 }}
            className="group p-8 bg-slate-800/50 border border-slate-700 rounded-2xl hover:border-purple-600 transition-colors"
          >
            <div className="mb-4 text-purple-500">{service.icon}</div>
            <h3 className="text-2xl font-bold mb-3 bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {service.title}
            </h3>
            <p className="text-slate-400 leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
