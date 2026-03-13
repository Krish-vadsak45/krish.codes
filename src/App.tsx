import { lazy, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Works from "./sections/Works";

// Lazily load sections/components with heavy 3D dependencies
const Tech = lazy(() => import("./sections/Tech"));
const Contact = lazy(() => import("./sections/Contact"));
const StarsCanvas = lazy(() => import("./components/canvas/Stars"));

const Divider = () => (
  <div className="section-divider mx-auto w-full max-w-5xl opacity-60" />
);

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Divider />
        <Works />
        <Divider />
        <Suspense fallback={null}>
          <Tech />
        </Suspense>
        <Divider />
        <div className="relative z-0">
          <Suspense fallback={null}>
            <Contact />
            <StarsCanvas />
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
