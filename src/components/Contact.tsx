import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from "lucide-react";

export default function Contact() {
  const [phoneValue, setPhoneValue] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const validatePhone = (value: string) => {
    // Basic phone validation: allows +, spaces, dashes, and digits (min 7 digits)
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (value && !phoneRegex.test(value)) {
      setPhoneError("Please enter a valid phone number format.");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone(phoneValue)) return;
    alert("Message sent! Our team will contact you shortly.");
  };

  return (
    <div className="flex-1 bg-background-dark pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-8xl font-bold uppercase italic leading-none mb-6"
          >
            Get In <span className="text-primary">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-2xl text-lg"
          >
            Have a project in mind? Our specialist engineers are available for consultations and technical inquiries.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-8 md:p-12 rounded-3xl border border-white/5"
          >
            <h2 className="text-3xl font-bold uppercase italic mb-8">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Full Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email Address</label>
                  <input 
                    type="email" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    value={phoneValue}
                    onChange={(e) => {
                      setPhoneValue(e.target.value);
                      if (phoneError) validatePhone(e.target.value);
                    }}
                    onBlur={(e) => validatePhone(e.target.value)}
                    className={`w-full bg-white/5 border ${phoneError ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors`}
                    placeholder="+1 (555) 000-0000"
                  />
                  {phoneError && <p className="text-red-500 text-[10px] uppercase font-bold tracking-widest">{phoneError}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Subject</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors appearance-none cursor-pointer">
                    <option className="bg-background-dark">General Inquiry</option>
                    <option className="bg-background-dark">Build Consultation</option>
                    <option className="bg-background-dark">Parts & Components</option>
                    <option className="bg-background-dark">Technical Support</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Your Message</label>
                <textarea 
                  required
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-primary text-black font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2"
              >
                Send Message <Send size={18} />
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold uppercase italic mb-8">Contact Information</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-sm mb-1">Headquarters</h4>
                    <p className="text-slate-400">4092 Performance Way, Silicon Valley<br />California, CA 94025</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-sm mb-1">Phone</h4>
                    <p className="text-slate-400">+1 (555) 010-4092</p>
                    <p className="text-slate-500 text-xs mt-1">Mon-Fri, 9am - 6pm PST</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-sm mb-1">Email</h4>
                    <p className="text-slate-400">engineering@throttlex.com</p>
                    <p className="text-slate-400">inquiries@throttlex.com</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-8 rounded-3xl border border-white/5 bg-white/5"
            >
              <div className="flex items-center gap-4 mb-6">
                <Clock className="text-primary" size={24} />
                <h3 className="text-xl font-bold uppercase italic">Operational Hours</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Monday - Friday</span>
                  <span className="font-bold">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Saturday</span>
                  <span className="font-bold">10:00 - 15:00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Sunday</span>
                  <span className="text-primary font-bold">Closed</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4 p-6 rounded-2xl border border-primary/20 bg-primary/5"
            >
              <MessageSquare className="text-primary" size={24} />
              <p className="text-sm text-slate-300">
                Looking for a quick quote? Use our <span className="text-primary font-bold cursor-pointer hover:underline">Configurator</span> to get an instant estimate.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
