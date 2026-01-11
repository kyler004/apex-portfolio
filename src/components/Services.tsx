import { services } from "../data";

const Services: React.FC = () => (
  <section id="services" className="py-20 px-6 bg-slate-900/50">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-black mb-4">What we do</h2>
        <p className="text-xl text-slate-400">
          Full-service solutions for modern brands
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="group p-8 bg-slate-800/50 border border-slate-700 rounded-2xl hover:border-purple-600 transition-all hover:transform hover:scale-105 duration-100"
          >
            <div className="text-5xl mb-4">{service.icon}</div>
            <h3 className="text-2xl font-bold mb-3 bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {service.title}
            </h3>
            <p className="text-slate-400 leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
