import { motion } from "motion/react";
import { ArrowRight, Shield, Cpu, CheckCircle } from "lucide-react";

export default function Services() {
  const disciplines = [
    {
      title: "Bespoke Interiors",
      tier: "TIER-01",
      description: "Experience surgical precision in cabin refinement. We specialize in Alcantara upholstery, hand-laid custom carbon trim, and ergonomic steering wheel redesigns tailored to your grip profile.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjjKu1j00m5rMcfZuypkXTi1hX_vE2x5qAmhjcY7806cBZ4mn_uRTDHoo3sYS-6EvCzXoCPFBpk41z6j6EAAE460h2SOYRaLf4x00r6S4g6Sr49QRvPouCn5yG2PSRd8whsJea3NS1RlWARWxVngsroRQvvqylz-sP42qB9Rh3BEy7xneWCmsh6MS_nJfBKh2bdaE03RBeHsTp-g8a9zFDr2CWQvUw59y_WudTmpddaF2ic5E3wa-iXxyxDlf__ik2LgiVW9R96mqD"
    },
    {
      title: "Aero & Exterior",
      tier: "TIER-02",
      description: "Computational Fluid Dynamics (CFD) backed aero components. Wide-body integration with factory-level panel gaps and precision vinyl wraps featuring self-healing PPF technology.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBud1SfNVS89ULy9r85fKwv37pGd1JMjoBIw_tF56F2A3fBoXNVQrZBraBe0EAD57pUVzZHUCN0I7FD4g4eDNHxtEDbrAj-uUCJoj4WNoQKX5x0WLUf6EM3cO4ha7KTBj5au5RJHE7YnhbVkmMjAkwvZp7jgR1XEmQ4iIGGvVt223lFqNRpGVJ8tZO0wnFr_5Ig0jTOkPV4oRrOdg8-a_HjRci82ic-IqXGJIP2rheF6yhSoNR1bToIjFlXjZZBpQGDqUvQyuxBbQoO"
    },
    {
      title: "Digital Architecture",
      tier: "TIER-03",
      description: "Modernizing the soul of the machine. From digital cluster retrofitting and OEM+ ambient light coding to Stage 1-3 ECU remapping for optimized torque curves.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeY34p8FdmnjcG2hOG-zv3sLt9QlNjlAsl6V5Vht_XMrU78YkJl_F9urVLiZeyZ3bcKTjZ3L5JxETWH_dm9n9nOIRfVhAlEGDmgWe8i0rWgzew17qS4DfMbJYvV5wDjiSVeyfwBS3yY-rTlhAha0HXNkYLRUWIJ8U7qjRK_gzzBmiA_gtOOMac0AAlAnuxHCsw6DVrGBAVaa2yOKydItsq8MxnC8TANuyJ9qBWNKTwP4NtDbi1BIV4XZva2mHs-zcdvJ6rXmlTvlhz"
    },
    {
      title: "Performance Engineering",
      tier: "TIER-04",
      description: "Mechanical mastery including valved exhaust systems, magnetic suspension tuning, and competition-grade brake upgrades. Engineered for reliability under extreme load.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuOo5Ze6omterAlFzhLRuAyAGpBwyQEu3cBWU4MeR5lxv7j8bNHulX-QjU-NG4bloXi-EwS5mnPLXAa1LgSFtVSdeh1sT6DpIdvz6GeywlxdSxSbPjzzni4dZwfngST9yJeOrvIeS0hWSI5MYf1jU1Zr68s1ad4f4PjnIHabBNbXwASKJN25MDAl69k-3dI56H2-9XSHyWO_puZlA4jNxqSk-7u9Y4fBxhnS7y2Uz-1tUpve9a-KZ139UrXeQ-JR8Ew44iUPNVEQ5F"
    },
    {
      title: "Full-Scale Customization",
      tier: "TIER-MAX",
      description: "Our signature concierge-level project management. We handle total transformations from ground up, managing logistics, design documentation, and final performance certification for one-of-one automotive builds.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJoNHGxeyeZnU65K1XYCrlrhFmao7zyJz9Gcl8LWwOlCSxcEJBzCRNn9S9-PvZVouk01MCTPQht4ZuX3Sd3jpZWeOZ1Ptl8KfA3huxbScCSOfcARkdDB30sg-zm5fJmyBpgeGoamjApjo6sru866Z4QuB6l0xF7NruYJxpyAiXlyYYAPojm8DSi-vFb94yjHqOdv0IxrJUnKYqGGK3imlM3XZPCAm1oWoWBvwnvU1wO5q_M0DPEoiiIRi89adIa_9lCAuapwmZC2Ci",
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
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDV6hrYtLCRO8Fdz7rUAMYTv-vo5cEpRqmQv0cTAr9MuqQOEWmjxdFuDyDTVhvp4IQmYW4Gttco-l3nnX6uNOqO_gCBak4XtJWx5-PJF6rhsti3WLZQoiJlp1MTCylDroNYy2O32GC9XDnJFIE2JFweTn7059QYbVPhOEuN8NbajaCnbkTFsZbxAbDPfaWoHVqPCDeGBzp_eJD8WFvf6CTDxwyiWzWzvr3DCT3WItbN8zG7rw8sAYHlMgdlyShLxw8zyc3PDtc-n5dO"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="max-w-3xl">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Automotive Engineering Excellence</span>
            <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter mb-8">
              MASTERING THE <br/> <span className="text-primary italic">ART</span> OF THE MACHINE
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-xl mb-10 leading-relaxed">
              Where precision engineering meets automotive artistry. We redefine technical boundaries for the ultimate driving experience through surgical modification.
            </p>
            <button className="bg-primary text-background-dark px-8 py-4 rounded font-bold tracking-wide flex items-center gap-2 group">
              VIEW TECHNICAL SPECS
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>
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
                <div className={`relative overflow-hidden rounded-lg mb-6 ${item.fullWidth ? 'aspect-[21/9]' : 'aspect-[4/3]'}`}>
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
