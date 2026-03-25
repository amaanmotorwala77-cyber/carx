import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Filter, ChevronLeft, ChevronRight, Share2, Check } from "lucide-react";

const categories = ["All", "BMW F90", "i20 Project"];

const galleryItems = [
  {
    id: 1,
    title: "Front Evolution",
    category: "BMW F90",
    image: "https://i.ibb.co/ksMTftQx/PHOTO-2025-09-26-19-34-56.jpg",
    description: "Full F90 M5 spec front bumper with LCI Laser LED headlights and signature M-grille."
  },
  {
    id: 2,
    title: "Rear Transformation",
    category: "BMW F90",
    image: "https://i.ibb.co/spy50DL8/PHOTO-2025-09-26-19-34-57-2.jpg",
    description: "F90 LCI tail lights, quad-exit diffuser, and trunk spoiler for the complete M5 aesthetic."
  },
  {
    id: 3,
    title: "Emerald Green Wrap",
    category: "BMW F90",
    image: "https://i.ibb.co/VbVqmJ5/PHOTO-2025-09-26-19-34-57.jpg",
    description: "Premium deep Emerald Green wrap that highlights the aggressive F90 body lines."
  },
  {
    id: 4,
    title: "M-Series Cockpit",
    category: "BMW F90",
    image: "https://i.ibb.co/hxFwQN14/PHOTO-2025-09-26-19-35-00.jpg",
    description: "Full digital cockpit upgrade with F90 M-Series steering wheel and digital instrument cluster."
  },
  {
    id: 5,
    title: "BBS Forged Detail",
    category: "BMW F90",
    image: "https://i.ibb.co/3y4zg5tZ/PHOTO-2025-09-26-19-35-02.jpg",
    description: "Custom bronze BBS forged wheels paired with performance tires for the perfect stance."
  },
  {
    id: 6,
    title: "Side Profile",
    category: "BMW F90",
    image: "https://i.ibb.co/Tq130wsj/PHOTO-2025-09-26-19-35-00-2.jpg",
    description: "Aggressive side skirts and M-style mirrors completing the F90 silhouette."
  },
  {
    id: 10,
    title: "Dynamic Stance",
    category: "BMW F90",
    image: "https://i.ibb.co/DHGtpts4/PHOTO-2025-09-26-19-35-03.jpg",
    description: "Low-angle shot showcasing the lowered stance and widened track width."
  },
  {
    id: 11,
    title: "Night Presence",
    category: "BMW F90",
    image: "https://i.ibb.co/q3g0Qy01/PHOTO-2025-09-26-19-35-05.jpg",
    description: "The LCI Laser LED signature illuminating the dark, highlighting the Emerald Green finish."
  },
  {
    id: 12,
    title: "M-Performance Detail",
    category: "BMW F90",
    image: "https://i.ibb.co/TMfsvjPK/PHOTO-2025-09-26-19-35-07.jpg",
    description: "Close-up of the M5 fender vents and carbon fiber mirror caps."
  },
  {
    id: 13,
    title: "Rear Quarter View",
    category: "BMW F90",
    image: "https://i.ibb.co/Xf9ND0BH/PHOTO-2025-09-26-19-35-09.jpg",
    description: "Showcasing the seamless integration of the F90 rear panels onto the F10 chassis."
  },
  {
    id: 14,
    title: "Interior Detail",
    category: "BMW F90",
    image: "https://i.ibb.co/cXRNz6Jq/PHOTO-2025-09-26-19-35-11.jpg",
    description: "M-stitched steering wheel and carbon fiber interior trim accents."
  },
  {
    id: 15,
    title: "Golden Hour Glow",
    category: "BMW F90",
    image: "https://i.ibb.co/wrBKkFdz/PHOTO-2025-09-26-19-35-12.jpg",
    description: "The Emerald Green wrap shifting tones under warm lighting."
  },
  {
    id: 16,
    title: "Aggressive Profile",
    category: "BMW F90",
    image: "https://i.ibb.co/PzgW7fS5/PHOTO-2025-09-26-19-36-44.jpg",
    description: "Low-angle side profile highlighting the F90 M5 Competition body lines."
  },
  {
    id: 17,
    title: "M-Series Detail",
    category: "BMW F90",
    image: "https://i.ibb.co/TqD7gcX9/PHOTO-2025-09-26-19-34-57-3.jpg",
    description: "Close-up of the M-Series badging and carbon fiber exterior accents."
  },
  {
    id: 18,
    title: "Final Inspection",
    category: "BMW F90",
    image: "https://i.ibb.co/fd80dCXb/IMG-3961.jpg",
    description: "The completed F10 to F90 conversion ready for delivery."
  },
  // i20 Project Items
  {
    id: 101,
    title: "Code 6 Performance",
    category: "i20 Project",
    image: "https://iili.io/qCdzCNa.jpg",
    description: "Stage 1 tune from Code 6 bumping power to 145bhp and 250Nm of torque."
  },
  {
    id: 102,
    title: "The N-Line Evolution",
    category: "i20 Project",
    image: "https://iili.io/qCdzBAg.jpg",
    description: "Bassam Khan's vision of what a true performance N-Line for India should have been."
  },
  {
    id: 103,
    title: "Throttle Response",
    category: "i20 Project",
    image: "https://iili.io/qCdzqHF.jpg",
    description: "Equipped with a Wind Booster throttle controller for instantaneous power delivery."
  },
  {
    id: 104,
    title: "Interior Craftsmanship",
    category: "i20 Project",
    image: "https://iili.io/qCdznDJ.jpg",
    description: "Bespoke interior customization that matches the aggressive performance upgrades."
  },
  {
    id: 105,
    title: "Handling Precision",
    category: "i20 Project",
    image: "https://iili.io/qCdzzVR.jpg",
    description: "Upgraded suspension and wheel setup to handle the increased 145bhp output."
  },
  {
    id: 106,
    title: "Night Presence",
    category: "i20 Project",
    image: "https://iili.io/qCdzIPp.jpg",
    description: "The i20's custom lighting signature illuminating the path for its high-speed runs."
  },
  {
    id: 107,
    title: "Driver's Cockpit",
    category: "i20 Project",
    image: "https://iili.io/qCdzAlI.jpg",
    description: "A cockpit designed for a 'car guy' who values both performance and aesthetics."
  },
  {
    id: 108,
    title: "Dynamic Performance",
    category: "i20 Project",
    image: "https://iili.io/qCdzRSt.jpg",
    description: "Sharp handling and punchy acceleration make this the ultimate daily-driven hatch."
  },
  {
    id: 109,
    title: "Custom Finish",
    category: "i20 Project",
    image: "https://iili.io/qCdzaNs.jpg",
    description: "A unique finish that sets this build apart from the 'riced-out' rides on the road."
  },
  {
    id: 110,
    title: "Rear Presence",
    category: "i20 Project",
    image: "https://iili.io/qCdz0xf.jpg",
    description: "Widened stance and custom rear elements reflecting the 250Nm torque potential."
  },
  {
    id: 111,
    title: "Red Engine Performance",
    category: "i20 Project",
    image: "https://iili.io/qCdz1V4.jpg",
    description: "Where the magic happens: Code 6 Stage 1 tuning and performance optimization."
  },
  {
    id: 112,
    title: "Bespoke Accents",
    category: "i20 Project",
    image: "https://iili.io/qCdzMf2.jpg",
    description: "Fine interior details that elevate the N-Line experience to a premium level."
  },
  {
    id: 113,
    title: "The Stance",
    category: "i20 Project",
    image: "https://iili.io/qCdzwOu.jpg",
    description: "Perfectly balanced stance that backs up the show with genuine go."
  },
  {
    id: 114,
    title: "Project Complete",
    category: "i20 Project",
    image: "https://iili.io/qCdzjRe.jpg",
    description: "Bassam Khan's completed masterpiece, ready to scoff at standard N-Lines."
  },
  {
    id: 115,
    title: "Performance Profile",
    category: "i20 Project",
    image: "https://iili.io/qCde3jn.jpg",
    description: "Sharp side profile showcasing the lowered stance and performance-oriented modifications."
  },
  {
    id: 116,
    title: "Aggressive Rear",
    category: "i20 Project",
    image: "https://iili.io/qCdeJpt.jpg",
    description: "Custom rear aesthetic with integrated aero components for improved high-speed stability."
  },
  {
    id: 117,
    title: "Track-Ready Stance",
    category: "i20 Project",
    image: "https://iili.io/qCde2TX.jpg",
    description: "Low-angle shot highlighting the i20's widened track and aggressive road presence."
  }
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleShare = async (title: string, text: string, url?: string) => {
    const shareUrl = url || window.location.href;
    const shareData = {
      title: `Antigravity - ${title}`,
      text: text,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  const filteredItems = activeCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  }, [filteredItems.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  }, [filteredItems.length]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  return (
    <div className="flex-1 bg-background-dark pt-24 pb-20 overflow-hidden">
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
                {activeCategory === "i20 Project" ? "i20 Custom" : "F10 to F90"} <span className="text-primary">{activeCategory === "i20 Project" ? "Build" : "Evolution"}</span>
              </h2>
            </div>
            <p className="text-slate-400 max-w-md text-sm leading-relaxed">
              {activeCategory === "i20 Project" 
                ? "Bassam Khan's i20 N Line is more than just a cosmetic upgrade. Featured in a leading automotive magazine, this build delivers the 'go' to back the 'show' with a Code 6 Stage 1 tune pushing 145bhp and 250Nm."
                : "A masterclass in visual transformation. We took a stock 2011 BMW 525d and executed a complete cosmetic conversion to 2023 M5 (F90) specifications, retaining the original mechanical reliability while achieving the ultimate M-Series aesthetic."
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Front Image & Specs */}
            <div className="space-y-8">
              <div className="glass-panel rounded-3xl overflow-hidden border border-white/5 group relative">
                <div className="relative aspect-video">
                  <img 
                    src={activeCategory === "i20 Project" ? "https://iili.io/qCdzCNa.jpg" : "https://i.ibb.co/ksMTftQx/PHOTO-2025-09-26-19-34-56.jpg"} 
                    alt={activeCategory === "i20 Project" ? "i20 Front" : "BMW F90 Front"} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ 
                      imageRendering: '-webkit-optimize-contrast',
                      filter: 'contrast(1.05) brightness(1.02) saturate(1.02)'
                    }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6 bg-primary text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    {activeCategory === "i20 Project" ? "Magazine Featured" : "After: F90 Spec"}
                  </div>
                  <button 
                    onClick={() => handleShare(
                      activeCategory === "i20 Project" ? "i20 Front" : "BMW F90 Front",
                      "Check out this transformation!",
                      activeCategory === "i20 Project" ? "https://iili.io/qCdzCNa.jpg" : "https://i.ibb.co/ksMTftQx/PHOTO-2025-09-26-19-34-56.jpg"
                    )}
                    className="absolute top-6 right-6 p-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-primary hover:text-black transition-all opacity-0 group-hover:opacity-100"
                    title="Share Image"
                  >
                    <Share2 size={14} />
                  </button>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-4 uppercase italic text-white">{activeCategory === "i20 Project" ? "i20 Transformation" : "Exterior Overhaul"}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-[10px] uppercase text-slate-500 mb-1">{activeCategory === "i20 Project" ? "Front Styling" : "Front End"}</p>
                      <p className="text-xs font-bold text-white">{activeCategory === "i20 Project" ? "Custom Aero & Grille" : "M5 Competition Bumper & Laser Lights"}</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-[10px] uppercase text-slate-500 mb-1">{activeCategory === "i20 Project" ? "Rear Styling" : "Rear End"}</p>
                      <p className="text-xs font-bold text-white">{activeCategory === "i20 Project" ? "Custom Diffuser & Lighting" : "F90 LCI Tail Lights & Quad Diffuser"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-panel rounded-3xl overflow-hidden border border-white/5 p-8">
                <h3 className="text-xl font-bold mb-6 uppercase italic text-white">{activeCategory === "i20 Project" ? "i20 Performance Specs" : "Comparison: Stock vs. Mod"}</h3>
                <div className="space-y-4">
                  {(activeCategory === "i20 Project" 
                    ? [
                        { part: "Tuning", stock: "Stock N-Line", mod: "Code 6 Stage 1" },
                        { part: "Power", stock: "118 bhp", mod: "145 bhp (+27)" },
                        { part: "Torque", stock: "172 Nm", mod: "250 Nm (+78)" },
                        { part: "Throttle", stock: "Standard", mod: "Wind Booster Controller" }
                      ]
                    : [
                        { part: "Headlights", stock: "Halogen/Xenon F10", mod: "F90 LCI Laser LED" },
                        { part: "Bumper", stock: "Standard F10 Luxury", mod: "M5 Competition Aero" },
                        { part: "Wheels", stock: "17\" OEM Alloys", mod: "20\" BBS Forged Bronze" },
                        { part: "Interior", stock: "Analog Cluster", mod: "Full Digital M-Display" }
                      ]
                  ).map((item, i) => (
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

            {/* Right Column: Rear Image & Details */}
            <div className="space-y-8">
              <div className="glass-panel rounded-3xl overflow-hidden border border-white/5 group relative">
                <div className="relative aspect-video">
                  <img 
                    src={activeCategory === "i20 Project" ? "https://iili.io/qCdzqHF.jpg" : "https://i.ibb.co/spy50DL8/PHOTO-2025-09-26-19-34-57-2.jpg"} 
                    alt={activeCategory === "i20 Project" ? "i20 Rear" : "BMW F90 Rear"} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ 
                      imageRendering: '-webkit-optimize-contrast',
                      filter: 'contrast(1.05) brightness(1.02) saturate(1.02)'
                    }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-6 left-6 right-6 p-4 glass-panel rounded-xl">
                    <p className="text-xs font-bold uppercase italic text-white">{activeCategory === "i20 Project" ? "i20 Rear Detail" : "Rear Evolution"}</p>
                    <p className="text-[10px] text-slate-400">{activeCategory === "i20 Project" ? "Custom Diffuser & Widebody Presence" : "Custom Emerald Green Wrap & F90 Body Lines"}</p>
                  </div>
                  <button 
                    onClick={() => handleShare(
                      activeCategory === "i20 Project" ? "i20 Rear" : "BMW F90 Rear",
                      "Check out this rear evolution!",
                      activeCategory === "i20 Project" ? "https://iili.io/qCdzqHF.jpg" : "https://i.ibb.co/spy50DL8/PHOTO-2025-09-26-19-34-57-2.jpg"
                    )}
                    className="absolute top-6 right-6 p-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-primary hover:text-black transition-all opacity-0 group-hover:opacity-100"
                    title="Share Image"
                  >
                    <Share2 size={14} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="glass-panel rounded-3xl overflow-hidden border border-white/5 group relative aspect-square">
                  <img 
                    src={activeCategory === "i20 Project" ? "https://iili.io/qCdzzVR.jpg" : "https://i.ibb.co/3y4zg5tZ/PHOTO-2025-09-26-19-35-02.jpg"} 
                    alt={activeCategory === "i20 Project" ? "i20 Wheel" : "BMW BBS Wheel"} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ 
                      imageRendering: '-webkit-optimize-contrast',
                      filter: 'contrast(1.05) brightness(1.02) saturate(1.02)'
                    }}
                    referrerPolicy="no-referrer"
                  />
                  <button 
                    onClick={() => handleShare(
                      activeCategory === "i20 Project" ? "i20 Wheel" : "BMW BBS Wheel",
                      "Check out these wheels!",
                      activeCategory === "i20 Project" ? "https://iili.io/qCdzzVR.jpg" : "https://i.ibb.co/3y4zg5tZ/PHOTO-2025-09-26-19-35-02.jpg"
                    )}
                    className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-primary hover:text-black transition-all opacity-0 group-hover:opacity-100"
                    title="Share Image"
                  >
                    <Share2 size={14} />
                  </button>
                </div>
                <div className="glass-panel rounded-3xl overflow-hidden border border-white/5 group relative aspect-square">
                  <img 
                    src={activeCategory === "i20 Project" ? "https://iili.io/qCdznDJ.jpg" : "https://i.ibb.co/hxFwQN14/PHOTO-2025-09-26-19-35-00.jpg"} 
                    alt={activeCategory === "i20 Project" ? "i20 Interior" : "BMW Interior"} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ 
                      imageRendering: '-webkit-optimize-contrast',
                      filter: 'contrast(1.05) brightness(1.02) saturate(1.02)'
                    }}
                    referrerPolicy="no-referrer"
                  />
                  <button 
                    onClick={() => handleShare(
                      activeCategory === "i20 Project" ? "i20 Interior" : "BMW Interior",
                      "Check out this interior!",
                      activeCategory === "i20 Project" ? "https://iili.io/qCdznDJ.jpg" : "https://i.ibb.co/hxFwQN14/PHOTO-2025-09-26-19-35-00.jpg"
                    )}
                    className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-primary hover:text-black transition-all opacity-0 group-hover:opacity-100"
                    title="Share Image"
                  >
                    <Share2 size={14} />
                  </button>
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
                    <th className="p-6 text-xs font-bold uppercase tracking-widest text-white/70">Visual</th>
                    <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-400">{activeCategory === "i20 Project" ? "Hyundai i20 N-Line - Stock" : "2011 BMW 525d (F10) - Stock"}</th>
                    <th className="p-6 text-xs font-bold uppercase tracking-widest text-primary">{activeCategory === "i20 Project" ? "i20 Performance - Upgraded" : "2023 BMW M5 (F90) - Upgraded"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {(activeCategory === "i20 Project" 
                    ? [
                        { 
                          part: "Engine / Tuning", 
                          icon: "⚡",
                          stock: "1.0L Turbo GDI - 118 HP", 
                          upgraded: "Code 6 Stage 1 - 145 HP",
                          image: "https://iili.io/qCdz1V4.jpg"
                        },
                        { 
                          part: "Torque", 
                          icon: "🏎️",
                          stock: "172 Nm @ 1500-4000 rpm", 
                          upgraded: "250 Nm @ 1500-4500 rpm",
                          image: "https://iili.io/qCde3jn.jpg"
                        },
                        { 
                          part: "Throttle", 
                          icon: "🛑",
                          stock: "Standard Drive-by-Wire", 
                          upgraded: "Wind Booster Controller",
                          image: "https://iili.io/qCdzAlI.jpg"
                        },
                        { 
                          part: "Interior", 
                          icon: "🛋️",
                          stock: "Stock N-Line Cabin", 
                          upgraded: "Bespoke Alcantara Accents",
                          image: "https://iili.io/qCdznDJ.jpg"
                        },
                        { 
                          part: "Body Kit", 
                          icon: "🎨",
                          stock: "Standard N-Line Trim", 
                          upgraded: "Custom Aero & Magazine Spec",
                          image: "https://iili.io/qCdzCNa.jpg"
                        },
                        { 
                          part: "Wheels", 
                          icon: "⚙️",
                          stock: "16\" OEM Alloys", 
                          upgraded: "Performance Forged Setup",
                          image: "https://iili.io/qCdzzVR.jpg"
                        },
                        { 
                          part: "Exhaust", 
                          icon: "💨",
                          stock: "Standard Dual Tips", 
                          upgraded: "Custom Performance System",
                          image: "https://iili.io/qCdzqHF.jpg"
                        }
                      ]
                    : [
                        { 
                          part: "Engine", 
                          icon: "⚡",
                          stock: "2.0L Inline-4 Diesel (N47) - 215 HP", 
                          upgraded: "4.4L V8 Twin-Turbo (S63) - 617 HP",
                          image: "https://i.ibb.co/ksMTftQx/PHOTO-2025-09-26-19-34-56.jpg"
                        },
                        { 
                          part: "Suspension", 
                          icon: "🏎️",
                          stock: "Standard Comfort Springs", 
                          upgraded: "Adaptive M-Suspension Professional",
                          image: "https://i.ibb.co/DHGtpts4/PHOTO-2025-09-26-19-35-03.jpg"
                        },
                        { 
                          part: "Brakes", 
                          icon: "🛑",
                          stock: "Single-piston Calipers", 
                          upgraded: "M-Compound 6-Piston Brakes",
                          image: "https://i.ibb.co/3y4zg5tZ/PHOTO-2025-09-26-19-35-02.jpg"
                        },
                        { 
                          part: "Interior", 
                          icon: "🛋️",
                          stock: "Dakota Leather Cluster", 
                          upgraded: "Merino & Digital Cockpit",
                          image: "https://i.ibb.co/hxFwQN14/PHOTO-2025-09-26-19-35-00.jpg"
                        },
                        { 
                          part: "Body Kit", 
                          icon: "🎨",
                          stock: "Standard F10 Luxury", 
                          upgraded: "Full F90 M5 Conversion",
                          image: "https://i.ibb.co/ksMTftQx/PHOTO-2025-09-26-19-34-56.jpg"
                        },
                        { 
                          part: "Wheels", 
                          icon: "⚙️",
                          stock: "17\" OEM Alloys", 
                          upgraded: "20\" BBS Forged Bronze",
                          image: "https://i.ibb.co/3y4zg5tZ/PHOTO-2025-09-26-19-35-02.jpg"
                        },
                        { 
                          part: "Exhaust", 
                          icon: "💨",
                          stock: "Single Exit Diesel", 
                          upgraded: "M5 Spec Quad-exit System",
                          image: "https://i.ibb.co/spy50DL8/PHOTO-2025-09-26-19-34-57-2.jpg"
                        }
                      ]
                  ).map((row, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors group">
                      <td className="p-6 text-sm font-bold text-white uppercase italic">
                        <div className="flex items-center gap-3">
                          <span className="text-lg opacity-50 group-hover:opacity-100 transition-opacity">{row.icon}</span>
                          {row.part}
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="w-24 h-16 rounded-lg overflow-hidden border border-white/10 group-hover:border-primary/50 transition-colors">
                          <img 
                            src={row.image} 
                            alt={row.part} 
                            className="w-full h-full object-cover"
                            style={{ 
                              imageRendering: '-webkit-optimize-contrast',
                              filter: 'contrast(1.05) brightness(1.02) saturate(1.02)'
                            }}
                            referrerPolicy="no-referrer"
                          />
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

        {/* Carousel Section */}
        <div className="relative group">
          <div className="overflow-hidden rounded-3xl border border-white/5 bg-slate-900/50 backdrop-blur-sm">
            <div className="relative h-[400px] md:h-[600px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={filteredItems[currentIndex].id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <img 
                      src={filteredItems[currentIndex].image} 
                      alt=""
                      className="w-full h-full object-cover blur-2xl opacity-50 scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <img 
                    src={filteredItems[currentIndex].image} 
                    alt={filteredItems[currentIndex].title}
                    className="w-full h-full object-contain relative z-10"
                    style={{ 
                      imageRendering: '-webkit-optimize-contrast',
                      filter: 'contrast(1.05) brightness(1.02) saturate(1.02)'
                    }}
                    referrerPolicy="no-referrer"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="text-primary text-xs font-bold uppercase tracking-widest mb-2 block">
                        {filteredItems[currentIndex].category}
                      </span>
                      <h3 className="text-3xl md:text-5xl font-bold uppercase italic mb-4">{filteredItems[currentIndex].title}</h3>
                      <p className="text-slate-300 text-base md:text-lg max-w-2xl mb-6">{filteredItems[currentIndex].description}</p>
                      <div className="flex items-center gap-6">
                        <button 
                          onClick={() => handleShare(
                            filteredItems[currentIndex].title,
                            filteredItems[currentIndex].description,
                            filteredItems[currentIndex].image
                          )}
                          className="flex items-center gap-2 text-white text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors"
                        >
                          {copied ? (
                            <>Copied! <Check size={16} className="text-primary" /></>
                          ) : (
                            <>Share <Share2 size={16} /></>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all z-10 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all z-10 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={24} />
          </button>

          {/* Progress Indicator */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex + 1) / filteredItems.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span className="text-xs font-mono text-slate-500">
              {String(currentIndex + 1).padStart(2, '0')} / {String(filteredItems.length).padStart(2, '0')}
            </span>
          </div>
        </div>

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
