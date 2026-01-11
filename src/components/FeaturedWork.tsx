import React from "react";
import { projects } from "../data";
import { motion } from "framer-motion";

const FeaturedWork: React.FC = () => {
  return (
    <section id="work" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            Featured Work
          </h2>
          <p className="text-xl text-slate-400">Projects we're proud of</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl aspect-video cursor-pointer"
            >
              <div
                className={`absolute inset-0 bg-linear-to-br ${project.gradient} opacity-80 group-hover:opacity-100 transition-opacity`}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <motion.div
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="mb-4"
                >
                  {project.image}
                </motion.div>
                <h3 className="text-3xl font-black mb-2">{project.title}</h3>
                <p className="text-lg opacity-90">{project.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
