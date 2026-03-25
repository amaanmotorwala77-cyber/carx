import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { db, collection, onSnapshot, query, orderBy, Timestamp, handleFirestoreError, OperationType } from "../firebase";
import { User as UserIcon, Car, Calendar, Mail, ShieldCheck, ChevronRight, Loader2, AlertCircle, Sparkles, X, TrendingUp } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  role: string;
  createdAt: Timestamp;
}

interface Build {
  id: string;
  userId: string;
  make: string;
  model: string;
  year: string;
  upgrades: string[];
  status: string;
  createdAt: Timestamp;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [builds, setBuilds] = useState<Build[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"users" | "builds">("builds");
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);

  useEffect(() => {
    const usersQuery = query(collection(db, "users"), orderBy("createdAt", "desc"));
    const buildsQuery = query(collection(db, "builds"), orderBy("createdAt", "desc"));

    const unsubUsers = onSnapshot(usersQuery, (snap) => {
      setUsers(snap.docs.map(doc => doc.data() as UserProfile));
    }, (err) => {
      console.error("Users snapshot error:", err);
      handleFirestoreError(err, OperationType.LIST, "users");
    });

    const unsubBuilds = onSnapshot(buildsQuery, (snap) => {
      setBuilds(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Build)));
      setIsLoading(false);
    }, (err) => {
      console.error("Builds snapshot error:", err);
      setError("Missing or insufficient permissions to view administrative data.");
      setIsLoading(false);
    });

    return () => {
      unsubUsers();
      unsubBuilds();
    };
  }, []);

  const generateBusinessSummary = async () => {
    setIsAiLoading(true);
    setShowAiModal(true);
    setAiSummary(null);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        setAiSummary("AI Insights are currently offline. Please configure GEMINI_API_KEY in Settings.");
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      
      // Prepare a summary of data for the AI
      const makes = builds.reduce((acc: any, b) => {
        acc[b.make] = (acc[b.make] || 0) + 1;
        return acc;
      }, {});
      
      const topMakes = Object.entries(makes)
        .sort((a: any, b: any) => b[1] - a[1])
        .slice(0, 3)
        .map(([make, count]) => `${make} (${count})`)
        .join(", ");

      const prompt = `As a Throttle X Business Analyst, provide a high-level executive summary of the current business state.
      Total Users: ${users.length}
      Total Builds: ${builds.length}
      Top Car Makes: ${topMakes || "None yet"}
      Recent Activity: ${builds.slice(0, 5).map(b => `${b.year} ${b.make} ${b.model}`).join(", ")}
      
      Provide:
      1. Growth Sentiment (How the business is trending)
      2. Popularity Insights (What cars/mods are hot)
      3. Strategic Recommendation (One actionable tip for growth)
      
      Keep it professional, data-driven, and under 100 words.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setAiSummary(response.text || "Analysis complete. Business is stable.");
    } catch (error) {
      console.error("Summary error:", error);
      setAiSummary("Error generating business insights. Please try again later.");
    } finally {
      setIsAiLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-dark">
        <Loader2 className="text-primary animate-spin" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-dark p-6">
        <div className="glass-panel p-8 rounded-2xl border border-red-500/20 max-w-md text-center">
          <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
          <h2 className="text-xl font-bold mb-2">Access Denied</h2>
          <p className="text-slate-400 text-sm mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-primary px-6 py-2 rounded-lg font-bold text-sm"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-background-dark py-24 px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="text-primary" size={20} />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary block">Command Center</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold uppercase italic">
              Admin <span className="text-primary">Dashboard</span>
            </h1>
          </div>
          <button 
            onClick={generateBusinessSummary}
            className="flex items-center gap-3 bg-white/5 border border-primary/30 text-primary px-8 py-4 rounded-xl font-bold hover:bg-primary/10 transition-all shadow-2xl shadow-primary/5"
          >
            <TrendingUp size={20} />
            GENERATE AI INSIGHTS
          </button>
        </div>

        <div className="flex gap-4 mb-12 bg-white/5 p-1 rounded-2xl w-fit">
          <button 
            onClick={() => setActiveTab("builds")}
            className={`px-8 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === "builds" ? "bg-primary text-white shadow-xl shadow-primary/20" : "text-slate-500 hover:text-white"}`}
          >
            ALL BUILDS ({builds.length})
          </button>
          <button 
            onClick={() => setActiveTab("users")}
            className={`px-8 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === "users" ? "bg-primary text-white shadow-xl shadow-primary/20" : "text-slate-500 hover:text-white"}`}
          >
            REGISTERED USERS ({users.length})
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "builds" ? (
            <motion.div 
              key="builds"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 gap-6"
            >
              {builds.map((build) => (
                <div key={build.id} className="glass-panel rounded-2xl p-6 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className="size-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                      <Car size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{build.year} {build.make} {build.model}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {build.upgrades.map((u, i) => (
                          <span key={i} className="text-[10px] uppercase font-bold text-slate-500 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                            {u}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-12 w-full md:w-auto justify-between md:justify-end">
                    <div className="text-right hidden sm:block">
                      <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Status</p>
                      <span className="text-xs font-bold text-primary uppercase">{build.status}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Date</p>
                      <p className="text-xs font-bold">{build.createdAt.toDate().toLocaleDateString()}</p>
                    </div>
                    <button className="size-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="users"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {users.map((user) => (
                <div key={user.uid} className="glass-panel rounded-2xl p-6 border border-white/5 hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-4 mb-6">
                    <img src={user.photoURL} alt="" className="size-12 rounded-full border border-primary/20" />
                    <div className="overflow-hidden">
                      <h3 className="font-bold truncate">{user.displayName}</h3>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider">
                      <span className="text-slate-500">Role</span>
                      <span className="text-primary">{user.role}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider">
                      <span className="text-slate-500">Joined</span>
                      <span>{user.createdAt.toDate().toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Insights Modal */}
        <AnimatePresence>
          {showAiModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="glass-panel w-full max-w-2xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
              >
                <div className="p-8 border-b border-white/10 flex items-center justify-between bg-white/5">
                  <div className="flex items-center gap-4">
                    <div className="size-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                      <TrendingUp size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold uppercase tracking-widest">Executive AI Insights</h2>
                      <p className="text-xs text-slate-400 font-bold uppercase">Business Intelligence Report</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowAiModal(false)}
                    className="p-2 text-slate-500 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div className="p-8 max-h-[60vh] overflow-y-auto no-scrollbar">
                  {isAiLoading ? (
                    <div className="flex flex-col items-center justify-center py-12 space-y-4">
                      <Loader2 className="text-primary animate-spin" size={48} />
                      <p className="text-sm font-bold uppercase tracking-widest text-slate-500 animate-pulse">Analyzing Business Metrics...</p>
                    </div>
                  ) : (
                    <div className="prose prose-invert max-w-none">
                      <div className="whitespace-pre-wrap text-slate-300 leading-relaxed font-medium">
                        {aiSummary}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-8 border-t border-white/10 bg-white/5 flex justify-end">
                  <button 
                    onClick={() => setShowAiModal(false)}
                    className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/80 transition-all"
                  >
                    CLOSE REPORT
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
