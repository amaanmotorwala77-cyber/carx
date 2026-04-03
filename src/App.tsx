import { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Configurator from "./components/Configurator";
import Garage from "./components/Garage";
import AdminDashboard from "./components/AdminDashboard";
import Login from "./components/Login";
import ChatBot from "./components/ChatBot";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Services from "./components/Services";
import Contact from "./components/Contact";
import { auth, onAuthStateChanged, User, db, doc, getDoc, setDoc, serverTimestamp } from "./firebase";
import { Loader2, AlertCircle, Wand2, X, ExternalLink, Settings as SettingsIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasKey, setHasKey] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);

  const sendEmail = async (to: string, subject: string, html: string) => {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, subject, html }),
      });
      if (!response.ok) {
        console.warn("Failed to send email:", await response.text());
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  useEffect(() => {
    const checkKey = async () => {
      let selected = false;
      try {
        if (window.aistudio?.hasSelectedApiKey) {
          selected = await window.aistudio.hasSelectedApiKey();
        }
      } catch (e) {
        console.error("Error checking aistudio key status:", e);
      }
      
      // Fetch from server-side config for secrets
      let hasServerKey = false;
      try {
        const res = await fetch("/api/config");
        const contentType = res.headers.get("content-type");
        if (res.ok && contentType && contentType.includes("application/json")) {
          const config = await res.json();
          hasServerKey = !!config.hasKey;
          if (config.apiKey) {
            // If the server has the key, we can use it
            (window as any).GEMINI_API_KEY = config.apiKey;
          }
        } else {
          const text = await res.text();
          console.warn("App: Server config endpoint returned non-JSON or error. Status:", res.status, "Content:", text.substring(0, 50));
        }
      } catch (e) {
        console.error("Error fetching server config:", e);
      }
      
      const hasEnvKey = !!(process.env.GEMINI_API_KEY || process.env.API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY || "AIzaSyCe91Yj8fAuPeGmkwCbZAcvfFAxavjggbM");
      const finalHasKey = selected || hasEnvKey || hasServerKey;
      
      if (finalHasKey) {
        console.log("AI Studio: Key detected!", {
          selected,
          hasEnvKey,
          hasServerKey,
          source: selected ? "Platform Dialog" : (hasServerKey ? "Server Secrets" : "Environment Variable")
        });
      }

      setHasKey(prev => {
        if (finalHasKey !== prev) {
          console.log("App: Key status updated. Active:", finalHasKey, "Source:", selected ? "aistudio" : (hasServerKey ? "server-env" : "client-env"));
          return finalHasKey;
        }
        return prev;
      });
    };
    checkKey();
    
    // Check periodically or on focus/visibility change
    const interval = setInterval(checkKey, 5000);
    window.addEventListener('focus', checkKey);
    window.addEventListener('visibilitychange', checkKey);
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', checkKey);
      window.removeEventListener('visibilitychange', checkKey);
    };
  }, []);

  const handleSelectKey = async () => {
    // Aggressive re-check before alerting
    const hasEnvKey = !!(process.env.GEMINI_API_KEY || process.env.API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY || "AIzaSyCe91Yj8fAuPeGmkwCbZAcvfFAxavjggbM");
    let selected = false;
    if (window.aistudio?.hasSelectedApiKey) {
      selected = await window.aistudio.hasSelectedApiKey();
    }
    
    if (hasEnvKey || selected) {
      setHasKey(true);
      return;
    }

    if (window.aistudio?.openSelectKey) {
      try {
        await window.aistudio.openSelectKey();
        // Small delay to allow platform to inject key
        setTimeout(async () => {
          if (window.aistudio?.hasSelectedApiKey) {
            const selected = await window.aistudio.hasSelectedApiKey();
            setHasKey(selected);
          }
        }, 1000);
      } catch (error) {
        console.error("Key selection error:", error);
        setShowKeyModal(true);
      }
    } else {
      setShowKeyModal(true);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Auth state changed:", currentUser?.email);
      
      if (!currentUser) {
        setUser(null);
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      // Update UI immediately with what we know
      setUser(currentUser);
      setIsAdmin(currentUser.email === "amaanmotorwala77@gmail.com");
      setIsLoading(false);

      // Background sync with Firestore
      try {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        
        let role = "user";
        if (currentUser.email === "amaanmotorwala77@gmail.com") {
          role = "admin";
        }

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
            role: role,
            createdAt: serverTimestamp()
          });

          // Send Welcome Email
          if (currentUser.email) {
            sendEmail(
              currentUser.email,
              "Welcome to AI Studio Free Tier 2!",
              `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0a0a; color: #ffffff; border-radius: 20px; border: 1px solid #2b8cee;">
                <h1 style="color: #2b8cee; text-transform: uppercase; font-style: italic;">Welcome to the Future of Automotive Design</h1>
                <p>Hello ${currentUser.displayName || 'Engineer'},</p>
                <p>Your account at <strong>AI Studio Free Tier 2</strong> has been successfully activated. You now have access to our next-generation generative engineering tools.</p>
                <div style="background-color: #1a1a1a; padding: 15px; border-radius: 10px; margin: 20px 0;">
                  <h3 style="color: #2b8cee; margin-top: 0;">What's Next?</h3>
                  <ul style="padding-left: 20px;">
                    <li>Configure your dream ride in the <strong>Configurator</strong>.</li>
                    <li>Generate photorealistic concepts in the <strong>AI Design Lab</strong>.</li>
                    <li>Manage your fleet in the <strong>Garage</strong>.</li>
                  </ul>
                </div>
                <p style="font-size: 12px; color: #666;">This is an automated notification from your AI Studio dashboard.</p>
              </div>
              `
            );
          }
        } else {
          const existingData = userSnap.data();
          if (currentUser.email === "amaanmotorwala77@gmail.com" && existingData.role !== "admin") {
            role = "admin";
            await setDoc(userRef, { 
              ...existingData, 
              role: "admin",
              updatedAt: serverTimestamp()
            }, { merge: true });
          } else {
            role = existingData.role;
          }
        }
        
        // Final update with correct role from Firestore if needed
        setIsAdmin(role === "admin");
      } catch (error: any) {
        console.error("Firestore sync error:", error);
        if (error?.code === "auth/network-request-failed") {
          console.error("Network error during auth sync. Check your connection.");
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home onNavigate={setCurrentPage} user={user} />;
      case "gallery":
        return <Gallery />;
      case "services":
        return <Services />;
      case "contact":
        return <Contact />;
      case "configurator":
        return user ? <Configurator onComplete={() => setCurrentPage("garage")} /> : <Login onNavigate={setCurrentPage} />;
      case "garage":
        return user ? <Garage onNavigate={setCurrentPage} /> : <Login onNavigate={setCurrentPage} />;
      case "admin":
        return isAdmin ? <AdminDashboard /> : <Login onNavigate={setCurrentPage} />;
      case "login":
        return user ? <Home onNavigate={setCurrentPage} user={user} /> : <Login onNavigate={setCurrentPage} />;
      default:
        return <Home onNavigate={setCurrentPage} user={user} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-white/50 font-bold uppercase tracking-widest text-xs">Initializing Systems...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-dark text-white selection:bg-primary/30 selection:text-primary flex flex-col">
      {!hasKey && (
        <div className="bg-red-600 py-3 px-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-[11px] font-bold uppercase tracking-widest z-[100] shadow-xl">
          <div className="flex items-center gap-2 text-white text-center">
            <AlertCircle size={16} className="text-white animate-pulse shrink-0" />
            <span>AI Studio <span className="bg-white/20 px-1.5 py-0.5 rounded text-[9px] mr-1">FREE TIER 2</span> Features are currently offline. Get your <a href="https://aistudio.google.com/app/apikey" target="_blank" className="underline hover:text-white/80">Free Gemini API Key</a> and select it. (If button fails, use Settings menu)</span>
          </div>
          <button 
            onClick={handleSelectKey}
            className="bg-white text-red-600 px-6 py-2 rounded-full hover:bg-white/90 transition-all flex items-center gap-2 shadow-lg scale-105 active:scale-95 shrink-0"
          >
            <Wand2 size={14} />
            SELECT AI KEY NOW
          </button>
        </div>
      )}
      <Header onNavigate={setCurrentPage} currentPage={currentPage} user={user} isAdmin={isAdmin} hasKey={hasKey} onSelectKey={handleSelectKey} />
      <main className="flex-1 flex flex-col">
        {renderPage()}
      </main>
      <ChatBot hasKey={hasKey} onSelectKey={handleSelectKey} />
      <Footer onNavigate={setCurrentPage} onSelectKey={handleSelectKey} hasKey={hasKey} />

      {/* Key Selection Help Modal */}
      <AnimatePresence>
        {showKeyModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-panel w-full max-w-md rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                    <Wand2 size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold uppercase tracking-widest">AI Activation</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Configuration Required</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowKeyModal(false)}
                  className="p-2 text-slate-500 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                      <ExternalLink size={16} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase mb-1">Build Interface</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Key selection dialog is only available inside the <span className="text-white font-bold">AI Studio Build</span> interface.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                      <SettingsIcon size={16} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase mb-1">Shared/Deployed Links</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        If you are using a <span className="text-white font-bold">Shared or Deployed link</span>, please set your <code className="bg-white/10 px-1 rounded text-primary">GEMINI_API_KEY</code> in the environment variables via the <span className="text-white font-bold">Settings menu</span> in AI Studio.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20">
                  <p className="text-[10px] text-primary font-bold uppercase text-center tracking-widest">
                    Need a key? <a href="https://aistudio.google.com/app/apikey" target="_blank" className="underline hover:text-primary/80">Get one free here</a>
                  </p>
                </div>
              </div>

              <div className="p-6 border-t border-white/10 bg-white/5">
                <button 
                  onClick={() => setShowKeyModal(false)}
                  className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/80 transition-all shadow-lg shadow-primary/20"
                >
                  UNDERSTOOD
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
