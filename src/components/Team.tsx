import React from "react";
import { team } from "../data";

const Team: React.FC = () => {
  return (
    <section id="team" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            Meet The Team
          </h2>
          <p className="text-xl text-slate-400">
            The creative minds behind APEX
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="group text-center p-8 bg-slate-800/50 border border-slate-700 rounded-2xl hover:border-purple-500 transition-all"
            >
              <div className="text-7xl mb-4 group-hover:scale-110 transition-transform">
                {member.emoji}
              </div>
              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p className="text-slate-400">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
