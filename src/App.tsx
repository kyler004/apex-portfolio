import React, { useState } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Services from "./components/Services";
import FeaturedWork from "./components/FeaturedWork";
import Process from "./components/Process";
import Stats from "./components/Stats";

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navigation
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      < Hero />
      <Services/>
      <FeaturedWork/>
      <Process/>
      <Stats />
    </div>
  );
};

export default App;
