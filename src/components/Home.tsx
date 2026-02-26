import { motion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, Wrench } from "lucide-react";

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const categories = [
    {
      id: "interior",
      title: "Interior Upgrades",
      description: "Bespoke cockpits and Alcantara finishes.",
      image: "https://i.ibb.co/hxFwQN14/PHOTO-2025-09-26-19-35-00.jpg"
    },
    {
      id: "exterior",
      title: "Exterior Aero",
      description: "Carbon fiber kits and aerodynamic efficiency.",
      image: "https://i.ibb.co/ksMTftQx/PHOTO-2025-09-26-19-34-56.jpg"
    },
    {
      id: "performance",
      title: "Performance Tuning",
      description: "ECU remapping and titanium exhaust systems.",
      image: "https://i.ibb.co/spy50DL8/PHOTO-2025-09-26-19-34-57-2.jpg"
    },
    {
      id: "electronics",
      title: "Electronics & Lighting",
      description: "Digital cockpit upgrades and laser lighting.",
      image: "https://i.ibb.co/q3g0Qy01/PHOTO-2025-09-26-19-35-05.jpg"
    }
  ];

  const featured = [
    {
      title: "Custom Alcantara Steering Wheels",
      features: ["Hand-stitched Italian Alcantara", "Carbon Fiber Inserts", "Programmable LED Shift Lights"],
      image: "https://i.ibb.co/hxFwQN14/PHOTO-2025-09-26-19-35-00.jpg",
      primary: true
    },
    {
      title: "Digital Cockpit Upgrades",
      features: ["12.3\" High-Res Display", "OEM Integration", "Custom Telemetry Interface"],
      image: "https://i.ibb.co/hxFwQN14/PHOTO-2025-09-26-19-35-00.jpg"
    },
    {
      title: "Titanium Exhaust System",
      features: ["Ultralight Grade 5 Titanium", "Valvetronic Sound Control", "Dyno-Tested Performance Gain"],
      image: "https://i.ibb.co/spy50DL8/PHOTO-2025-09-26-19-34-57-2.jpg"
    }
  ];

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full overflow-hidden">
        <img 
          alt="High performance BMW F90 conversion" 
          className="absolute inset-0 h-full w-full object-cover" 
          src="https://i.ibb.co/wrBKkFdz/PHOTO-2025-09-26-19-35-12.jpg"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-6 lg:px-10">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-primary"
          >
            Parts Catalogue
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl text-5xl font-bold leading-tight tracking-tight lg:text-7xl"
          >
            The Engineering <br/> Behind the Build
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-lg text-lg text-slate-400"
          >
            Precision components for those who demand perfection. Explore our curated selection of high-performance modifications.
          </motion.p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h3 className="text-3xl font-bold">Product Categories</h3>
            <p className="mt-2 text-slate-500">Select a category to view technical specifications.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, idx) => (
            <motion.div 
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-[400px] overflow-hidden rounded-xl bg-charcoal cursor-pointer"
            >
              {cat.image ? (
                <img 
                  alt={cat.title} 
                  className="h-full w-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-108" 
                  src={cat.image}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="absolute inset-0 bg-charcoal flex items-center justify-center">
                   <Wrench className="w-16 h-16 text-white/10" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
              <div className="absolute bottom-0 p-8">
                <h4 className="text-xl font-bold">{cat.title}</h4>
                <p className="mt-2 text-sm text-slate-400">{cat.description}</p>
                <button className="mt-6 flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-4 transition-all">
                  EXPLORE <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Components Section */}
      <section className="bg-charcoal/50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-bold">Featured Components</h3>
            <div className="flex gap-4">
              <button className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 hover:border-primary transition-colors">
                <ChevronLeft />
              </button>
              <button className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 hover:border-primary transition-colors">
                <ChevronRight />
              </button>
            </div>
          </div>
          <div className="no-scrollbar flex gap-8 overflow-x-auto pb-8">
            {featured.map((item, idx) => (
              <motion.div 
                key={idx}
                className="min-w-[400px] flex-shrink-0 rounded-xl bg-background-dark border border-white/5 p-8 transition-all hover:border-primary/50"
              >
                <div className="mb-6 aspect-video w-full overflow-hidden rounded-lg bg-charcoal flex items-center justify-center">
                  {item.image ? (
                    <img 
                      alt={item.title} 
                      className="h-full w-full object-cover" 
                      src={item.image}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <Wrench className="w-16 h-16 text-white/5" />
                  )}
                </div>
                <h5 className="text-xl font-bold">{item.title}</h5>
                <ul className="mt-4 space-y-2 text-sm text-slate-400">
                  {item.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-primary"></span> {f}
                    </li>
                  ))}
                </ul>
                <button 
                  className={`mt-8 w-full rounded-lg py-3 text-sm font-bold tracking-wider transition-all ${
                    item.primary 
                      ? "bg-primary hover:shadow-[0_0_20px_rgba(43,140,238,0.4)]" 
                      : "bg-white/5 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  VIEW DETAILS
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Button */}
      <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate("configurator")}
          className="flex items-center gap-3 rounded-full bg-primary px-10 py-4 text-sm font-bold tracking-widest text-white shadow-2xl shadow-primary/40"
        >
          <Wrench className="w-5 h-5" />
          START YOUR BUILD
        </motion.button>
      </div>
    </div>
  );
}
