import React, { useState } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navigation
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      < Hero />
    </div>
  );
};

export default App;
