import React from "react";
import { projects } from "../data";

const FeaturedWork: React.FC = () => {
  return (
    <section id="work" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            Featured Work
          </h2>
          <p className="text-xl text-slate-400">
            Projects we're proud of
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl aspect-video cursor-pointer"
            >
              <div className={`absolute inset-0 bg-linear-to-br ${project.gradient} opacity-80 group-hover:opacity-100 transition-opacity`} />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <div className="text-7xl mb-4 group-hover:scale-110 transition-transform">
                  {project.image}
                </div>
                <h3 className="text-3xl font-black mb-2">{project.title}</h3>
                <p className="text-lg opacity-90">{project.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
