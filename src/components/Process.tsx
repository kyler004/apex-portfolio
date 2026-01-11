import React from "react";
import { steps } from "../data";

const Process: React.FC = () => {
  return (
    <section id="process" className="py-20 px-6 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-4">Our Process</h2>
          <p className="text-xl text-slate-400">From concept to Launch</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="text-6xl font-black bg-linear-to-br from-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
                {step.number}
              </div>
              <h3 className="text-4xl font-bold mb-3">{step.title}</h3>
              <p className="text-slate-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
