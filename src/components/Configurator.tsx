import { motion } from "motion/react";
import { ArrowRight, ArrowLeft, CheckCircle, Car, Armchair, Cpu, Star, Shield, Wrench, Gauge, User, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { BuildData, Step } from "../types";

const carMakes = [
  "Acura", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Bugatti", 
  "Cadillac", "Chevrolet", "Chrysler", "Dodge", "Ferrari", "Fiat", "Ford", 
  "Genesis", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia", 
  "Koenigsegg", "Lamborghini", "Land Rover", "Lexus", "Lincoln", "Lotus", 
  "Maserati", "Mazda", "McLaren", "Mercedes-Benz", "MINI", "Mitsubishi", 
  "Nissan", "Pagani", "Porsche", "Ram", "Rolls-Royce", "Subaru", "Tesla", 
  "Toyota", "Volkswagen", "Volvo"
].sort();

interface ConfiguratorProps {
  onComplete: (data: BuildData) => void;
}

export default function Configurator({ onComplete }: ConfiguratorProps) {
  const [step, setStep] = useState<Step>(1);
  const [buildData, setBuildData] = useState<BuildData>({
    make: "",
    model: "",
    year: "",
    upgrades: [],
    name: "",
    email: "",
    phone: ""
  });

  const handleNext = () => {
    if (step < 3) setStep((s) => (s + 1) as Step);
    else onComplete(buildData);
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => (s - 1) as Step);
  };

  const toggleUpgrade = (id: string) => {
    setBuildData(prev => ({
      ...prev,
      upgrades: prev.upgrades.includes(id) 
        ? prev.upgrades.filter(u => u !== id)
        : [...prev.upgrades, id]
    }));
  };

  const isStepValid = () => {
    if (step === 1) return buildData.make && buildData.model && buildData.year;
    if (step === 2) return buildData.upgrades.length > 0;
    if (step === 3) return buildData.name && buildData.email && buildData.phone;
    return false;
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background-dark via-background-dark/90 to-primary/20 z-10"></div>
        <div 
          className="w-full h-full bg-center bg-cover" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAQtKpQy8RGIfd3Q_3aY0VG8PjwsduGZY4h_c1bArbgaeATNUiYxPgPRdTh6myeTZKzAM_yLiPJjx0W64w14zysY1P6rHgWaq9plnMV_z2CG8bXAeqAg2R6hYh6q_eJBrRGjkVH6GV975HLZAysqekPL_PNU8D10k6i3StMZ3uCQVewZXpeGBKJ17ADg4eeeNeDbO0N2_k9HYFF0BSB4DtPfutrgfoFy6r1EL5oP6F7Ootxzlq6uuEpKJc3SmTTrrHfYDJTdS142rxc')" }}
        ></div>
      </div>

      <main className="relative z-20 w-full max-w-4xl mt-10">
        <div className="glass-panel rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-1/3 bg-background-dark/50 p-8 border-r border-white/10 flex flex-col justify-between">
            <div>
              <span className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-2 block">Configure</span>
              <h1 className="text-3xl font-bold leading-tight mb-6">Build Your Dream Machine</h1>
              
              <div className="space-y-8">
                {[
                  { n: 1, title: "Car Details", desc: "The foundation" },
                  { n: 2, title: "Services", desc: "Choose upgrades" },
                  { n: 3, title: "Goals", desc: "Contact details" }
                ].map((s) => (
                  <div key={s.n} className={`flex items-center gap-4 ${step < s.n ? 'opacity-50' : ''}`}>
                    <div className={`size-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s.n ? 'bg-primary' : 'border-2 border-slate-600'}`}>
                      {s.n}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">{s.title}</span>
                      <span className="text-xs text-slate-500">{s.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-xs text-slate-400 leading-relaxed italic">
                "Performance is not just about speed, it's about the soul of the machine."
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="w-full md:w-2/3 p-8 md:p-12">
            <div className="mb-10">
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs font-bold uppercase text-primary">Step {step} of 3</p>
                <p className="text-xs font-bold">{step === 1 ? '33%' : step === 2 ? '66%' : '100%'} Complete</p>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
                  className="h-full bg-primary shadow-[0_0_10px_#2b8cee]"
                ></motion.div>
              </div>
            </div>

            {step === 1 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">Identify your ride</h2>
                  <p className="text-slate-400 text-sm">Provide the base specs of your vehicle to see available mods.</p>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Vehicle Make</label>
                    <select 
                      value={buildData.make}
                      onChange={(e) => setBuildData({...buildData, make: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Select Make</option>
                      {carMakes.map(make => (
                        <option key={make} value={make} className="bg-background-dark">{make}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Model</label>
                      <input 
                        type="text"
                        value={buildData.model}
                        onChange={(e) => setBuildData({...buildData, model: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-600" 
                        placeholder="e.g. 911 GT3" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Year</label>
                      <input 
                        type="number"
                        value={buildData.year}
                        onChange={(e) => setBuildData({...buildData, year: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-600" 
                        placeholder="2024" 
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-8 flex justify-end">
                  <button 
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className={`px-10 py-4 rounded-lg font-bold flex items-center gap-2 group transition-all ${
                      isStepValid() 
                        ? "bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(43,140,238,0.3)]" 
                        : "bg-white/5 text-slate-500 cursor-not-allowed border border-white/10"
                    }`}
                  >
                    NEXT STEP
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">Select your upgrades</h2>
                  <p className="text-slate-400 text-sm">What parts of your vehicle need the Throttle X touch?</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'interior', title: 'Interior', desc: 'Luxury materials & custom upholstery', icon: <Armchair /> },
                    { id: 'exterior', title: 'Exterior', desc: 'Body kits, aero & premium wraps', icon: <Car /> },
                    { id: 'tech', title: 'Tech', desc: 'Sound systems & ECU tuning', icon: <Cpu /> },
                    { id: 'full', title: 'Full Custom', desc: 'The ground-up premium overhaul', icon: <Star /> }
                  ].map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => toggleUpgrade(item.id)}
                      className={`group relative p-6 bg-white/5 border-2 rounded-xl cursor-pointer transition-all ${
                        buildData.upgrades.includes(item.id) 
                          ? 'border-primary bg-primary/10' 
                          : 'border-white/10 hover:border-primary hover:bg-primary/5'
                      }`}
                    >
                      <div className="text-primary mb-4">
                        {item.icon}
                      </div>
                      <h3 className="font-bold mb-1">{item.title}</h3>
                      <p className="text-xs text-slate-400">{item.desc}</p>
                      {buildData.upgrades.includes(item.id) && (
                        <div className="absolute top-4 right-4">
                          <CheckCircle className="text-primary w-5 h-5" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="pt-8 flex justify-between">
                  <button 
                    onClick={handleBack}
                    className="border border-white/20 hover:bg-white/5 px-8 py-4 rounded-lg font-bold flex items-center gap-2 transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    BACK
                  </button>
                  <button 
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className={`px-10 py-4 rounded-lg font-bold flex items-center gap-2 group transition-all ${
                      isStepValid() 
                        ? "bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(43,140,238,0.3)]" 
                        : "bg-white/5 text-slate-500 cursor-not-allowed border border-white/10"
                    }`}
                  >
                    NEXT STEP
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">Finalize your build</h2>
                  <p className="text-slate-400 text-sm">Provide your contact details so our engineers can reach out.</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                      <input 
                        type="text"
                        value={buildData.name}
                        onChange={(e) => setBuildData({...buildData, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-600" 
                        placeholder="John Doe" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                      <input 
                        type="email"
                        value={buildData.email}
                        onChange={(e) => setBuildData({...buildData, email: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-600" 
                        placeholder="john@example.com" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Contact Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                      <input 
                        type="tel"
                        value={buildData.phone}
                        onChange={(e) => setBuildData({...buildData, phone: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-600" 
                        placeholder="+1 (555) 000-0000" 
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-8 flex justify-between">
                  <button 
                    onClick={handleBack}
                    className="border border-white/20 hover:bg-white/5 px-8 py-4 rounded-lg font-bold flex items-center gap-2 transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    BACK
                  </button>
                  <button 
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className={`px-10 py-4 rounded-lg font-bold flex items-center gap-2 group transition-all ${
                      isStepValid() 
                        ? "bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(43,140,238,0.3)]" 
                        : "bg-white/5 text-slate-500 cursor-not-allowed border border-white/10"
                    }`}
                  >
                    FINISH BUILD
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Floating Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-panel p-4 rounded-lg flex items-center gap-4 border-l-4 border-l-primary">
            <Wrench className="text-primary" />
            <div>
              <p className="text-[10px] uppercase tracking-tighter text-slate-400">Precision Work</p>
              <p className="text-sm font-bold italic">ISO 9001 CERTIFIED</p>
            </div>
          </div>
          <div className="glass-panel p-4 rounded-lg flex items-center gap-4 border-l-4 border-l-primary/40">
            <Shield className="text-primary" />
            <div>
              <p className="text-[10px] uppercase tracking-tighter text-slate-400">Parts Warranty</p>
              <p className="text-sm font-bold italic">3-YEAR COVERAGE</p>
            </div>
          </div>
          <div className="glass-panel p-4 rounded-lg flex items-center gap-4 border-l-4 border-l-primary/40">
            <Gauge className="text-primary" />
            <div>
              <p className="text-[10px] uppercase tracking-tighter text-slate-400">Est. Lead Time</p>
              <p className="text-sm font-bold italic">4-6 WEEKS</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
