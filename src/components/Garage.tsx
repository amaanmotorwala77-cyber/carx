import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { db, auth, collection, query, where, onSnapshot, deleteDoc, doc, Timestamp } from "../firebase";
import { Car, Trash2, Calendar, Settings, ChevronRight, Loader2, Plus, Sparkles, X } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

interface Build {
  id: string;
  make: string;
  model: string;
  year: string;
  upgrades: string[];
  status: string;
  createdAt: Timestamp;
}

interface GarageProps {
  onNavigate: (page: string) => void;
}

export default function Garage({ onNavigate }: GarageProps) {
  const [builds, setBuilds] = useState<Build[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBuild, setSelectedBuild] = useState<Build | null>(null);
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "builds"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const buildData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Build[];
      
      setBuilds(buildData.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()));
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching builds:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this build from your garage?")) return;
    try {
      await deleteDoc(doc(db, "builds", id));
    } catch (error) {
      console.error("Error deleting build:", error);
    }
  };

  const generateReport = async (build: Build) => {
    setSelectedBuild(build);
    setIsGeneratingReport(true);
    setAiReport(null);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        setAiReport("AI Analysis is currently offline. Please configure GEMINI_API_KEY in Settings.");
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `As a Throttle X Master Engineer, provide a detailed technical analysis and "Master Verdict" for this build.
      Vehicle: ${build.year} ${build.make} ${build.model}
      Upgrades: ${build.upgrades.join(", ")}
      Status: ${build.status}
      
      Structure the response with:
      1. Technical Synergy (How well the parts work together)
      2. Performance Impact (Estimated gains or feel)
      3. Master Verdict (A final punchy summary)
      
      Keep it professional, technical, and under 100 words.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setAiReport(response.text || "Report generation failed. Our engineers are manually reviewing.");
    } catch (error) {
      console.error("Report error:", error);
      setAiReport("Error generating technical report. Please try again later.");
    } finally {
      setIsGeneratingReport(false);
    }
  };

  return (
    <div className="flex-1 bg-background-dark py-24 px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4 block"
            >
              Member Portal
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold uppercase italic"
            >
              The <span className="text-primary">Garage</span>
            </motion.h1>
          </div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => onNavigate("configurator")}
            className="flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary/80 transition-all shadow-2xl shadow-primary/20"
          >
            <Plus size={20} />
            NEW BUILD
          </motion.button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="text-primary animate-spin" size={48} />
          </div>
        ) : builds.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-panel rounded-3xl p-12 text-center border border-white/5"
          >
            <div className="size-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-500">
              <Car size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Your garage is empty</h3>
            <p className="text-slate-400 max-w-md mx-auto mb-8">
              You haven't saved any car configurations yet. Start a new build to see it here.
            </p>
            <button 
              onClick={() => onNavigate("configurator")}
              className="text-primary font-bold hover:underline flex items-center gap-2 mx-auto"
            >
              Go to Configurator <ChevronRight size={16} />
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatePresence>
              {builds.map((build, idx) => (
                <motion.div
                  key={build.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-panel rounded-3xl overflow-hidden border border-white/5 group hover:border-primary/30 transition-all"
                >
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                          <Car size={24} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">{build.year} {build.make}</h3>
                          <p className="text-slate-400 font-medium">{build.model}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full ${
                          build.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                          build.status === 'in-progress' ? 'bg-blue-500/10 text-blue-500' :
                          'bg-primary/10 text-primary'
                        }`}>
                          {build.status}
                        </span>
                        <button 
                          onClick={() => handleDelete(build.id)}
                          className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-2 text-slate-500 mb-1">
                          <Settings size={12} />
                          <span className="text-[10px] uppercase font-bold tracking-wider">Upgrades</span>
                        </div>
                        <p className="text-sm font-bold text-white">{build.upgrades.length} Selected</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-2 text-slate-500 mb-1">
                          <Calendar size={12} />
                          <span className="text-[10px] uppercase font-bold tracking-wider">Created</span>
                        </div>
                        <p className="text-sm font-bold text-white">
                          {build.createdAt.toDate().toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {build.upgrades.map((upgrade, i) => (
                        <span key={i} className="text-[10px] uppercase font-bold text-slate-400 bg-white/5 px-3 py-1 rounded-lg border border-white/5">
                          {upgrade}
                        </span>
                      ))}
                    </div>

                    <button 
                      onClick={() => generateReport(build)}
                      className="w-full py-4 bg-white/5 hover:bg-primary hover:text-white border border-white/10 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 group"
                    >
                      <Sparkles size={16} className="text-primary group-hover:text-white" />
                      AI TECHNICAL REPORT
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* AI Report Modal */}
        <AnimatePresence>
          {selectedBuild && (
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
                      <Sparkles size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold uppercase tracking-widest">AI Technical Analysis</h2>
                      <p className="text-xs text-slate-400 font-bold uppercase">{selectedBuild.year} {selectedBuild.make} {selectedBuild.model}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedBuild(null)}
                    className="p-2 text-slate-500 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div className="p-8 max-h-[60vh] overflow-y-auto no-scrollbar">
                  {isGeneratingReport ? (
                    <div className="flex flex-col items-center justify-center py-12 space-y-4">
                      <Loader2 className="text-primary animate-spin" size={48} />
                      <p className="text-sm font-bold uppercase tracking-widest text-slate-500 animate-pulse">Analyzing Build Specs...</p>
                    </div>
                  ) : (
                    <div className="prose prose-invert max-w-none">
                      <div className="whitespace-pre-wrap text-slate-300 leading-relaxed font-medium">
                        {aiReport}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-8 border-t border-white/10 bg-white/5 flex justify-end">
                  <button 
                    onClick={() => setSelectedBuild(null)}
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
