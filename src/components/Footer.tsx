import { Gauge, Sparkles } from "lucide-react";

interface FooterProps {
  onNavigate: (page: string) => void;
  onSelectKey: () => void;
  hasKey: boolean;
}

export default function Footer({ onNavigate, onSelectKey, hasKey }: FooterProps) {
  return (
    <footer className="border-t border-white/5 bg-background-dark py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-3">
              <Gauge className="text-primary w-8 h-8" />
              <h2 className="text-2xl font-bold tracking-tight uppercase flex items-center gap-3">
                throttleX <span className="text-primary">X</span>
              </h2>
            </div>
            <p className="mt-6 max-w-sm text-slate-500">
              Performance engineered. Aesthetic perfected. The ultimate catalogue for high-end automotive modifications.
            </p>
            <div className="mt-8">
              <button 
                onClick={onSelectKey}
                className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
                  hasKey 
                    ? "bg-green-500/10 border-green-500/20 text-green-500" 
                    : "bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20"
                }`}
              >
                <Sparkles size={12} className={hasKey ? "" : "animate-pulse"} />
                <div className="flex flex-col items-start">
                  <span>{hasKey ? "AI Status: Active" : "Select AI Key (Offline)"}</span>
                  {!hasKey && <span className="text-[7px] opacity-60">If button fails, use Settings menu</span>}
                </div>
              </button>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-primary">Explore</h4>
            <ul className="mt-6 flex flex-col gap-4 text-sm font-medium">
              <li><button onClick={() => onNavigate("home")} className="text-slate-500 hover:text-white transition-colors">Home</button></li>
              <li><button onClick={() => onNavigate("gallery")} className="text-slate-500 hover:text-white transition-colors">Gallery</button></li>
              <li><button onClick={() => onNavigate("services")} className="text-slate-500 hover:text-white transition-colors">Services</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-primary">Inquiry</h4>
            <ul className="mt-6 flex flex-col gap-4 text-sm font-medium">
              <li><button onClick={() => onNavigate("contact")} className="text-slate-500 hover:text-white transition-colors">Contact Specialist</button></li>
              <li><button onClick={() => onNavigate("configurator")} className="text-slate-500 hover:text-white transition-colors">Request Quote</button></li>
            </ul>
          </div>
        </div>
        <div className="mt-20 border-t border-white/5 pt-8 text-xs text-slate-600">
          <p>© 2026 throttleX Engineering. No retail sales. Professional installation required.</p>
        </div>
      </div>
    </footer>
  );
}
