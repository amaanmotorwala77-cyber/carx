import { Gauge } from "lucide-react";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-white/5 bg-background-dark py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-3">
              <Gauge className="text-primary w-8 h-8" />
              <h2 className="text-2xl font-bold tracking-tight uppercase">
                THROTTLE <span className="text-primary">X</span>
              </h2>
            </div>
            <p className="mt-6 max-w-sm text-slate-500">
              Performance engineered. Aesthetic perfected. The ultimate catalogue for high-end automotive modifications.
            </p>
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
          <p>© 2024 Throttle X Engineering. No retail sales. Professional installation required.</p>
        </div>
      </div>
    </footer>
  );
}
