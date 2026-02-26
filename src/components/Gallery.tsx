import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Search, Filter } from "lucide-react";

const categories = ["All", "Conversions"];

const galleryItems = [
  {
    id: 1,
    title: "Front Evolution",
    category: "Conversions",
    image: "https://i.ibb.co/ksMTftQx/PHOTO-2025-09-26-19-34-56.jpg",
    description: "Full F90 M5 spec front bumper with LCI Laser LED headlights and signature M-grille."
  },
  {
    id: 2,
    title: "Rear Transformation",
    category: "Conversions",
    image: "https://i.ibb.co/spy50DL8/PHOTO-2025-09-26-19-34-57-2.jpg",
    description: "F90 LCI tail lights, quad-exit diffuser, and trunk spoiler for the complete M5 aesthetic."
  },
  {
    id: 3,
    title: "Emerald Green Wrap",
    category: "Conversions",
    image: "https://i.ibb.co/VbVqmJ5/PHOTO-2025-09-26-19-34-57.jpg",
    description: "Premium deep Emerald Green wrap that highlights the aggressive F90 body lines."
  },
  {
    id: 4,
    title: "M-Series Cockpit",
    category: "Conversions",
    image: "https://i.ibb.co/hxFwQN14/PHOTO-2025-09-26-19-35-00.jpg",
    description: "Full digital cockpit upgrade with F90 M-Series steering wheel and digital instrument cluster."
  },
  {
    id: 5,
    title: "BBS Forged Detail",
    category: "Conversions",
    image: "https://i.ibb.co/3y4zg5tZ/PHOTO-2025-09-26-19-35-02.jpg",
    description: "Custom bronze BBS forged wheels paired with performance tires for the perfect stance."
  },
  {
    id: 6,
    title: "Side Profile",
    category: "Conversions",
    image: "https://i.ibb.co/Tq130wsj/PHOTO-2025-09-26-19-35-00-2.jpg",
    description: "Aggressive side skirts and M-style mirrors completing the F90 silhouette."
  },
  {
    id: 10,
    title: "Dynamic Stance",
    category: "Conversions",
    image: "https://i.ibb.co/DHGtpts4/PHOTO-2025-09-26-19-35-03.jpg",
    description: "Low-angle shot showcasing the lowered stance and widened track width."
  },
  {
    id: 11,
    title: "Night Presence",
    category: "Conversions",
    image: "https://i.ibb.co/q3g0Qy01/PHOTO-2025-09-26-19-35-05.jpg",
    description: "The LCI Laser LED signature illuminating the dark, highlighting the Emerald Green finish."
  },
  {
    id: 12,
    title: "M-Performance Detail",
    category: "Conversions",
    image: "https://i.ibb.co/TMfsvjPK/PHOTO-2025-09-26-19-35-07.jpg",
    description: "Close-up of the M5 fender vents and carbon fiber mirror caps."
  },
  {
    id: 13,
    title: "Rear Quarter View",
    category: "Conversions",
    image: "https://i.ibb.co/Xf9ND0BH/PHOTO-2025-09-26-19-35-09.jpg",
    description: "Showcasing the seamless integration of the F90 rear panels onto the F10 chassis."
  },
  {
    id: 14,
    title: "Interior Detail",
    category: "Conversions",
    image: "https://i.ibb.co/cXRNz6Jq/PHOTO-2025-09-26-19-35-11.jpg",
    description: "M-stitched steering wheel and carbon fiber interior trim accents."
  },
  {
    id: 15,
    title: "Golden Hour Glow",
    category: "Conversions",
    image: "https://i.ibb.co/wrBKkFdz/PHOTO-2025-09-26-19-35-12.jpg",
    description: "The Emerald Green wrap shifting tones under warm lighting."
  },
  {
    id: 16,
    title: "Aggressive Profile",
    category: "Conversions",
    image: "https://i.ibb.co/PzgW7fS5/PHOTO-2025-09-26-19-36-44.jpg",
    description: "Low-angle side profile highlighting the F90 M5 Competition body lines."
  },
  {
    id: 17,
    title: "M-Series Detail",
    category: "Conversions",
    image: "https://i.ibb.co/TqD7gcX9/PHOTO-2025-09-26-19-34-57-3.jpg",
    description: "Close-up of the M-Series badging and carbon fiber exterior accents."
  },
  {
    id: 18,
    title: "Final Inspection",
    category: "Conversions",
    image: "https://i.ibb.co/fd80dCXb/IMG-3961.jpg",
    description: "The completed F10 to F90 conversion ready for delivery."
  }
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="flex-1 bg-background-dark pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-8xl font-bold uppercase italic leading-none mb-6"
          >
            The <span className="text-primary">Gallery</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-2xl text-lg mb-12"
          >
            A curated showcase of our most ambitious builds. Each vehicle represents a unique fusion of engineering precision and artistic vision.
          </motion.p>

          <div className="flex flex-wrap items-center gap-4 border-y border-white/5 py-6">
            <div className="flex items-center gap-2 text-slate-500 mr-4">
              <Filter size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">Filter By:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                    ? "bg-primary text-black" 
                    : "bg-white/5 text-slate-400 hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        {/* Featured Conversion Section */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-3 block">Featured Project</span>
              <h2 className="text-4xl md:text-6xl font-bold uppercase italic leading-none">
                F10 to F90 <span className="text-primary">Evolution</span>
              </h2>
            </div>
            <p className="text-slate-400 max-w-md text-sm leading-relaxed">
              A masterclass in visual transformation. We took a stock 2011 BMW 525d and executed a complete cosmetic conversion to 2023 M5 (F90) specifications, retaining the original mechanical reliability while achieving the ultimate M-Series aesthetic.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="glass-panel rounded-3xl overflow-hidden border border-white/5 group">
                <div className="relative aspect-video">
                  <img 
                    src="https://i.ibb.co/ksMTftQx/PHOTO-2025-09-26-19-34-56.jpg" 
                    alt="BMW F90 Front" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ imageRendering: 'auto' }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6 bg-primary text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    After: F90 Spec
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-4 uppercase italic text-white">Exterior Overhaul</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-[10px] uppercase text-slate-500 mb-1">Front End</p>
                      <p className="text-xs font-bold text-white">M5 Competition Bumper & Laser Lights</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-[10px] uppercase text-slate-500 mb-1">Rear End</p>
                      <p className="text-xs font-bold text-white">F90 LCI Tail Lights & Quad Diffuser</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-panel rounded-3xl overflow-hidden border border-white/5 p-8">
                <h3 className="text-xl font-bold mb-6 uppercase italic text-white">Comparison: Stock vs. Mod</h3>
                <div className="space-y-4">
                  {[
                    { part: "Headlights", stock: "Halogen/Xenon F10", mod: "F90 LCI Laser LED" },
                    { part: "Bumper", stock: "Standard F10 Luxury", mod: "M5 Competition Aero" },
                    { part: "Wheels", stock: "17\" OEM Alloys", mod: "20\" BBS Forged Bronze" },
                    { part: "Interior", stock: "Analog Cluster", mod: "Full Digital M-Display" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{item.part}</span>
                      <div className="flex gap-4 text-[11px]">
                        <span className="px-2 py-1 bg-white/5 rounded text-slate-500">Stock: {item.stock}</span>
                        <span className="px-2 py-1 bg-primary/10 rounded text-primary font-bold">Mod: {item.mod}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="glass-panel rounded-3xl overflow-hidden border border-white/5 group">
                <div className="relative h-full">
                  <img 
                    src="https://i.ibb.co/spy50DL8/PHOTO-2025-09-26-19-34-57-2.jpg" 
                    alt="BMW F90 Rear" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-6 left-6 right-6 p-4 glass-panel rounded-xl">
                    <p className="text-xs font-bold uppercase italic text-white">Rear Evolution</p>
                    <p className="text-[10px] text-slate-400">Custom Emerald Green Wrap & F90 Body Lines</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-8">
                <div className="glass-panel rounded-3xl overflow-hidden border border-white/5 flex-1 group">
                  <img 
                    src="https://i.ibb.co/3y4zg5tZ/PHOTO-2025-09-26-19-35-02.jpg" 
                    alt="BMW BBS Wheel" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="glass-panel rounded-3xl overflow-hidden border border-white/5 flex-1 group">
                  <img 
                    src="https://i.ibb.co/hxFwQN14/PHOTO-2025-09-26-19-35-00.jpg" 
                    alt="BMW Interior" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Stock Parts Comparison Table */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="mb-12">
            <span className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-3 block">Technical Specs</span>
            <h2 className="text-4xl md:text-5xl font-bold uppercase italic leading-none">
              Stock Parts <span className="text-primary">Comparison</span>
            </h2>
          </div>

          <div className="glass-panel rounded-3xl overflow-hidden border border-white/5">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="p-6 text-xs font-bold uppercase tracking-widest text-primary">Part</th>
                    <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-400">2011 BMW 525d (F10) - Stock</th>
                    <th className="p-6 text-xs font-bold uppercase tracking-widest text-primary">2023 BMW M5 (F90) - Upgraded</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { 
                      part: "Engine", 
                      icon: "⚡",
                      stock: "2.0L Inline-4 Diesel (N47) - 215 HP", 
                      upgraded: "4.4L V8 Twin-Turbo (S63) - 617 HP" 
                    },
                    { 
                      part: "Suspension", 
                      icon: "🏎️",
                      stock: "Standard Comfort Springs & Dampers", 
                      upgraded: "Adaptive M-Suspension Professional" 
                    },
                    { 
                      part: "Brakes", 
                      icon: "🛑",
                      stock: "Single-piston Floating Calipers", 
                      upgraded: "M-Compound 6-Piston Fixed Calipers" 
                    },
                    { 
                      part: "Interior", 
                      icon: "🛋️",
                      stock: "Dakota Leather & Analog Cluster", 
                      upgraded: "Merino Leather & Full Digital Cockpit" 
                    },
                    { 
                      part: "Body Kit", 
                      icon: "🎨",
                      stock: "Standard F10 Luxury Line", 
                      upgraded: "Full F90 M5 Competition Conversion" 
                    },
                    { 
                      part: "Wheels", 
                      icon: "⚙️",
                      stock: "17\" OEM Alloys", 
                      upgraded: "20\" BBS Forged Bronze Edition" 
                    },
                    { 
                      part: "Exhaust", 
                      icon: "💨",
                      stock: "Single Exit Diesel", 
                      upgraded: "M5 Spec Quad-exit Performance System" 
                    }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors group">
                      <td className="p-6 text-sm font-bold text-white uppercase italic">
                        <div className="flex items-center gap-3">
                          <span className="text-lg opacity-50 group-hover:opacity-100 transition-opacity">{row.icon}</span>
                          {row.part}
                        </div>
                      </td>
                      <td className="p-6 text-sm text-slate-400 font-medium">{row.stock}</td>
                      <td className="p-6 text-sm text-white font-bold">
                        <span className="flex items-center gap-2">
                          <div className="size-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,255,157,0.8)]"></div>
                          {row.upgraded}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>

        <motion.div 
          layout
          className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="break-inside-avoid group relative overflow-hidden rounded-2xl bg-slate-900 border border-white/5"
              >
                <div className="overflow-hidden bg-slate-800">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ 
                      imageRendering: '-webkit-optimize-contrast',
                      display: 'block'
                    }}
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-primary text-xs font-bold uppercase tracking-widest mb-2 block">
                      {item.category}
                    </span>
                    <h3 className="text-2xl font-bold uppercase italic mb-2">{item.title}</h3>
                    <p className="text-slate-300 text-sm mb-4">{item.description}</p>
                    <button className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">
                      View Project <ExternalLink size={14} />
                    </button>
                  </div>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black">
                    <Search size={18} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-500 italic">No projects found in this category yet.</p>
          </div>
        )}

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-12 rounded-3xl border border-primary/20 bg-primary/5 text-center"
        >
          <h2 className="text-3xl font-bold uppercase italic mb-4">Ready to start your own project?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Our engineers are ready to bring your vision to life. Let's build something extraordinary together.
          </p>
          <button className="px-8 py-4 bg-primary text-black font-bold uppercase tracking-widest rounded-full hover:bg-white transition-colors">
            Contact Our Team
          </button>
        </motion.div>
      </div>
    </div>
  );
}
