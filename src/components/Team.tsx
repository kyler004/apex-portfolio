import React from "react";
import { team } from "../data";
import { motion } from "framer-motion";

const Team: React.FC = () => {
  return (
    <section id="team" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            Meet The Team
          </h2>
          <p className="text-xl text-slate-400">
            The creative minds behind APEX
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="group text-center p-8 bg-slate-800/50 border border-slate-700 rounded-2xl hover:border-purple-500 transition-colors"
            >
              <div className="mb-4 inline-block group-hover:scale-110 transition-transform duration-300">
                {member.emoji}
              </div>
              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p className="text-slate-400">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
