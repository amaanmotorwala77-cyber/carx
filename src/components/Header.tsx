import { motion, AnimatePresence } from "motion/react";
import { Gauge, Menu, X, User as UserIcon, LogOut, LayoutDashboard, Sparkles, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { auth, googleProvider, signInWithPopup, signOut, User } from "../firebase";

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  user: User | null;
  isAdmin: boolean;
}

export default function Header({ onNavigate, currentPage, user, isAdmin }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navItems = [
    { name: "Home", id: "home" },
    { name: "Gallery", id: "gallery" },
    { name: "Services", id: "services" },
    { name: "Contact", id: "contact" },
  ];

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onNavigate("home");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background-dark/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => onNavigate("home")}
        >
          <div className="text-primary">
            <Gauge className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-bold tracking-tight uppercase">
            THROTTLE <span className="text-primary">X</span>
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                currentPage === item.id ? "text-primary border-b-2 border-primary pb-1" : "text-white/70"
              }`}
            >
              {item.name}
            </button>
          ))}
          {user && (
            <>
              <button
                onClick={() => onNavigate("garage")}
                className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-2 ${
                  currentPage === "garage" ? "text-primary border-b-2 border-primary pb-1" : "text-white/70"
                }`}
              >
                <LayoutDashboard size={16} />
                Garage
              </button>
              <button
                onClick={() => onNavigate("ai-lab")}
                className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-2 ${
                  currentPage === "ai-lab" ? "text-primary border-b-2 border-primary pb-1" : "text-white/70"
                }`}
              >
                <Sparkles size={16} />
                AI Lab
              </button>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate("configurator")}
            className="hidden sm:block rounded-lg bg-primary/10 border border-primary/20 px-5 py-2.5 text-sm font-bold text-primary hover:bg-primary hover:text-white transition-all"
          >
            Inquiry
          </button>

          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="size-10 rounded-full overflow-hidden border-2 border-primary/20 hover:border-primary transition-all"
              >
                <img src={user.photoURL || ""} alt={user.displayName || ""} className="w-full h-full object-cover" />
              </button>
              
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-48 bg-background-dark border border-white/10 rounded-xl shadow-2xl overflow-hidden p-2"
                  >
                    <div className="px-3 py-2 border-b border-white/5 mb-2">
                      <p className="text-xs font-bold truncate">{user.displayName}</p>
                      <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                    </div>
                    <button 
                      onClick={() => {
                        onNavigate("garage");
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-xs text-slate-300 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <LayoutDashboard size={14} />
                      My Garage
                    </button>
                    <button 
                      onClick={() => {
                        onNavigate("ai-lab");
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-xs text-slate-300 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <Sparkles size={14} />
                      AI Design Lab
                    </button>
                    {isAdmin && (
                      <button 
                        onClick={() => {
                          onNavigate("admin");
                          setIsProfileOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-xs text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      >
                        <ShieldCheck size={14} />
                        Admin Dashboard
                      </button>
                    )}
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 text-xs text-red-400 hover:bg-red-400/10 rounded-lg transition-colors mt-2"
                    >
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button 
              onClick={handleLogin}
              className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/10 transition-all"
            >
              <UserIcon size={16} />
              Login
            </button>
          )}

          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background-dark border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left text-sm font-medium py-2 ${
                    currentPage === item.id ? "text-primary" : "text-white/70"
                  }`}
                >
                  {item.name}
                </button>
              ))}
              {user && (
                <>
                  <button
                    onClick={() => {
                      onNavigate("garage");
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full text-left text-sm font-medium py-2 ${
                      currentPage === "garage" ? "text-primary" : "text-white/70"
                    }`}
                  >
                    My Garage
                  </button>
                  <button
                    onClick={() => {
                      onNavigate("ai-lab");
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full text-left text-sm font-medium py-2 ${
                      currentPage === "ai-lab" ? "text-primary" : "text-white/70"
                    }`}
                  >
                    AI Design Lab
                  </button>
                </>
              )}
              <button
                onClick={() => {
                  onNavigate("configurator");
                  setIsMenuOpen(false);
                }}
                className="block w-full text-center rounded-lg bg-primary py-3 text-sm font-bold text-white"
              >
                Start Build
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
