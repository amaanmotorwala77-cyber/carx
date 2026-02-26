import { motion } from "motion/react";
import { Gauge, Menu, X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function Header({ onNavigate, currentPage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", id: "home" },
    { name: "Gallery", id: "gallery" },
    { name: "Services", id: "services" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background-dark/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => onNavigate("home")}
        >
          <div className="text-primary">
            <Gauge className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-bold tracking-tight uppercase">
            THROTTLE <span className="text-primary">X</span>
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                currentPage === item.id ? "text-primary border-b-2 border-primary pb-1" : "text-white/70"
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate("configurator")}
            className="rounded-lg bg-primary/10 border border-primary/20 px-5 py-2.5 text-sm font-bold text-primary hover:bg-primary hover:text-white transition-all"
          >
            Inquiry
          </button>
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-background-dark border-b border-white/5 px-6 py-4 space-y-4"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsMenuOpen(false);
              }}
              className="block w-full text-left text-sm font-medium text-white/70 hover:text-primary py-2"
            >
              {item.name}
            </button>
          ))}
        </motion.div>
      )}
    </header>
  );
}
