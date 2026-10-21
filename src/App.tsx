import React, { useState } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Services from "./components/Services";
import FeaturedWork from "./components/FeaturedWork";
import Process from "./components/Process";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import Team from "./components/Team";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SmoothScroll from "./components/cinematic/SmoothScroll";
import FilmOverlay from "./components/cinematic/FilmOverlay";
import CustomCursor from "./components/cinematic/CustomCursor";
import Preloader from "./components/cinematic/Preloader";

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ready, setReady] = useState(false);
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SmoothScroll />
      <FilmOverlay />
      <CustomCursor />
      <Preloader onDone={() => setReady(true)} />
      <Navigation
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <Hero ready={ready} />
      <Services />
      <FeaturedWork />
      <Process />
      <Stats />
      <Testimonials />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
