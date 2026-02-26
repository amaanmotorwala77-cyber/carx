import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Configurator from "./components/Configurator";
import Success from "./components/Success";
import { BuildData } from "./types";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [submittedData, setSubmittedData] = useState<BuildData | null>(null);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleBuildComplete = (data: BuildData) => {
    setSubmittedData(data);
    setCurrentPage("success");
    window.scrollTo(0, 0);
  };

  const handleReset = () => {
    setSubmittedData(null);
    setCurrentPage("home");
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-dark text-white font-display">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            {currentPage === "home" && <Home onNavigate={handleNavigate} />}
            {currentPage === "services" && <Services />}
            {currentPage === "gallery" && <Gallery />}
            {currentPage === "contact" && <Contact />}
            {currentPage === "configurator" && <Configurator onComplete={handleBuildComplete} />}
            {currentPage === "success" && submittedData && (
              <Success data={submittedData} onReset={handleReset} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {currentPage !== "configurator" && currentPage !== "success" && <Footer onNavigate={handleNavigate} />}
      
      {/* Global Build ID Footer */}
      <footer className="py-8 text-center text-slate-500 text-xs uppercase tracking-widest bg-background-dark">
        © 2024 Throttle X Modifications. All Rights Reserved. Build #TX-4092
      </footer>
    </div>
  );
}
