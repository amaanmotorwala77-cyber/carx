import { motion } from "motion/react";
import { Shield, Cpu, CheckCircle } from "lucide-react";

export default function Services() {
  const disciplines = [
    {
      title: "Bespoke Interiors",
      tier: "TIER-01",
      description: "Experience surgical precision in cabin refinement. We specialize in Alcantara upholstery, hand-laid custom carbon trim, and ergonomic steering wheel redesigns tailored to your grip profile.",
      image: "https://i.ibb.co/cXRNz6Jq/PHOTO-2025-09-26-19-35-11.jpg"
    },
    {
      title: "Aero & Exterior",
      tier: "TIER-02",
      description: "Computational Fluid Dynamics (CFD) backed aero components. Wide-body integration with factory-level panel gaps and precision vinyl wraps featuring self-healing PPF technology.",
      image: "https://i.ibb.co/ksMTftQx/PHOTO-2025-09-26-19-34-56.jpg"
    },
    {
      title: "Digital Architecture",
      tier: "TIER-03",
      description: "Modernizing the soul of the machine. From digital cluster retrofitting and OEM+ ambient light coding to Stage 1-3 ECU remapping for optimized torque curves.",
      image: "https://i.ibb.co/hxFwQN14/PHOTO-2025-09-26-19-35-00.jpg"
    },
    {
      title: "Performance Engineering",
      tier: "TIER-04",
      description: "Mechanical mastery including valved exhaust systems, magnetic suspension tuning, and competition-grade brake upgrades. Engineered for reliability under extreme load.",
      image: "https://iili.io/qCdz1V4.jpg"
    },
    {
      title: "Full-Scale Customization",
      tier: "TIER-MAX",
      description: "Our signature concierge-level project management. We handle total transformations from ground up, managing logistics, design documentation, and final performance certification for one-of-one automotive builds.",
      image: "https://i.ibb.co/fd80dCXb/IMG-3961.jpg",
      fullWidth: true
    }
  ];

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden technical-grid">
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent z-10"></div>
        <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-2/3 opacity-20 hidden lg:block" style={{ pointerEvents: 'none' }}>
          <img 
            className="w-full grayscale brightness-200" 
            src="https://i.ibb.co/wrBKkFdz/PHOTO-2025-09-26-19-35-12.jpg"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="max-w-3xl">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Automotive Engineering Excellence</span>
            <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter mb-8 flex flex-wrap items-center gap-6">
              MASTERING THE <br/> <span className="text-primary italic">ART</span> OF THE MACHINE
              <span className="text-[10px] not-italic font-bold bg-primary/20 text-primary px-3 py-1 rounded-full tracking-widest border border-primary/30">FT2</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-xl mb-10 leading-relaxed">
              Where precision engineering meets automotive artistry. We redefine technical boundaries for the ultimate driving experience through surgical modification.
            </p>
          </div>
        </div>
      </section>

      {/* Disciplines Grid */}
      <section className="py-24 bg-white dark:bg-[#0a1114]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-2">Capabilities</h2>
              <h3 className="text-4xl font-bold">Technical Disciplines</h3>
            </div>
            <p className="hidden md:block text-slate-400 max-w-xs text-right text-sm">Every modification is logged and certified to exceed industry standards.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {disciplines.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`group bg-background-dark p-1 rounded-xl border border-white/5 hover:border-primary/50 transition-all duration-500 ${item.fullWidth ? 'lg:col-span-2' : ''}`}
              >
                <div className={`relative overflow-hidden rounded-lg mb-6 ${item.fullWidth ? 'aspect-[21/9]' : 'aspect-video'}`}>
                  <img 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    src={item.image}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="px-5 pb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xl font-bold">{item.title}</h4>
                    <span className="text-[10px] text-primary border border-primary/30 px-2 py-0.5 rounded font-mono">{item.tier}</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-24 bg-background-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Quality Assurance</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Every modification is executed with surgical precision and backed by our industry-leading performance guarantee.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <CheckCircle />, title: "OEM+ Quality", desc: "We match or exceed original manufacturer standards in every fit and finish. Your car retains its factory soul with enhanced performance." },
              { icon: <Cpu />, title: "Precision Engineering", desc: "Utilizing 3D scanning and CNC machining for millimeter-perfect integration. Our components are designed to perform, not just look the part." },
              { icon: <Shield />, title: "Warranty Backed", desc: "Full technical support and lifetime coverage on all mechanical and digital upgrades installed by our certified master technicians." }
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-xl bg-[#192d33] border border-[#325a67] transition-transform hover:-translate-y-1">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                <p className="text-[#92bbc9] text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
