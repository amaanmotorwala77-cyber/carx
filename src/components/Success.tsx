import { motion } from "motion/react";
import { CheckCircle, ArrowLeft, ExternalLink, Settings, Clock, Shield, Star } from "lucide-react";
import { BuildData } from "../types";

interface SuccessProps {
  data: BuildData;
  onReset: () => void;
}

export default function Success({ data, onReset }: SuccessProps) {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background-dark via-background-dark/95 to-primary/10 z-10"></div>
        <div 
          className="w-full h-full bg-center bg-cover" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAQtKpQy8RGIfd3Q_3aY0VG8PjwsduGZY4h_c1bArbgaeATNUiYxPgPRdTh6myeTZKzAM_yLiPJjx0W64w14zysY1P6rHgWaq9plnMV_z2CG8bXAeqAg2R6hYh6q_eJBrRGjkVH6GV975HLZAysqekPL_PNU8D10k6i3StMZ3uCQVewZXpeGBKJ17ADg4eeeNeDbO0N2_k9HYFF0BSB4DtPfutrgfoFy6r1EL5oP6F7Ootxzlq6uuEpKJc3SmTTrrHfYDJTdS142rxc')" }}
        ></div>
      </div>

      <main className="relative z-20 w-full max-w-2xl text-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary blur-3xl opacity-20 rounded-full scale-150"></div>
              <div className="relative bg-primary/10 border-2 border-primary/30 rounded-full p-6 text-primary flex items-center justify-center">
                <CheckCircle className="w-16 h-16" />
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight uppercase italic">
              Your Journey <span className="text-primary">Starts Here.</span>
            </h1>
            <p className="text-slate-400 max-w-md mx-auto leading-relaxed">
              Thank you for choosing Throttle X. Our lead engineer will review your build request and reach out within 24-48 hours with a curated proposal.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-10 text-left space-y-6">
            <div className="flex items-center gap-5">
              <div className="size-16 rounded-lg bg-cover bg-center shrink-0 border border-white/10" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAQtKpQy8RGIfd3Q_3aY0VG8PjwsduGZY4h_c1bArbgaeATNUiYxPgPRdTh6myeTZKzAM_yLiPJjx0W64w14zysY1P6rHgWaq9plnMV_z2CG8bXAeqAg2R6hYh6q_eJBrRGjkVH6GV975HLZAysqekPL_PNU8D10k6i3StMZ3uCQVewZXpeGBKJ17ADg4eeeNeDbO0N2_k9HYFF0BSB4DtPfutrgfoFy6r1EL5oP6F7Ootxzlq6uuEpKJc3SmTTrrHfYDJTdS142rxc')" }}></div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">Build Submission</p>
                <h3 className="text-xl font-bold">{data.year} {data.make} {data.model}</h3>
                <div className="flex gap-4 mt-1">
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Settings className="w-3 h-3" /> 
                    {data.upgrades.length > 0 ? data.upgrades.join(", ") : "Full Custom"}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> 
                    4-6 Weeks
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Client Name</p>
                <p className="text-sm font-bold">{data.name}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Contact Info</p>
                <p className="text-sm font-bold">{data.email}</p>
                <p className="text-xs text-slate-400">{data.phone}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={onReset}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-lg font-bold flex items-center justify-center gap-2 group transition-all shadow-[0_0_25px_rgba(43,140,238,0.2)]"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              RETURN TO HOME
            </button>
            <a className="text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors flex items-center gap-2" href="#">
              EXPLORE MORE BUILDS
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        </motion.div>

        <div className="mt-8 flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-tighter">
            <CheckCircle className="text-primary w-4 h-4" />
            Precision Engineering
          </div>
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-tighter">
            <Shield className="text-primary w-4 h-4" />
            Secure Data
          </div>
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-tighter">
            <Star className="text-primary w-4 h-4" />
            TX-Certified
          </div>
        </div>
      </main>
    </div>
  );
}
