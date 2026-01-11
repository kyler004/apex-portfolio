import React from "react";
import { Briefcase, Users, TrendingUp, Star } from "lucide-react";
const Stats: React.FC = () => {
  const stats = [
    { icon: <Briefcase className="w-8 h-8" />, value: '200+', label: 'Projects Completed' },
    { icon: <Users className="w-8 h-8" />, value: '150+', label: 'Happy Clients' },
    { icon: <TrendingUp className="w-8 h-8" />, value: '95%', label: 'Client Retention' },
    { icon: <Star className="w-8 h-8" />, value: '4.9/5', label: 'Average Rating' },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-block p-4 bg-linear-to-br from-purple-600 to-pink-600 rounded-2xl mb-4">
                {stat.icon}
              </div>
              <div className="text-4xl md:text-5xl font-black mb-2">{stat.value}</div>
              <div className="text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats; 