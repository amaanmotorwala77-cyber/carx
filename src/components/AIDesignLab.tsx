import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, Image as ImageIcon, Video, Mic, Search, Send, 
  Loader2, Download, Share2, Trash2, Maximize2, 
  ChevronRight, ArrowRight, Wand2, Play, Square, 
  Volume2, VolumeX, AlertCircle
} from "lucide-react";
import { GoogleGenAI, Modality, Type, LiveServerMessage } from "@google/genai";
import { db, auth, collection, addDoc, serverTimestamp, onSnapshot, query, where, deleteDoc, doc, Timestamp } from "../firebase";

interface AIProject {
  id: string;
  prompt: string;
  type: "image" | "video";
  url: string;
  createdAt: Timestamp;
}

export default function AIDesignLab() {
  const [activeTab, setActiveTab] = useState<"image" | "video" | "voice">("image");
  const [prompt, setPrompt] = useState("");
  const [imageSize, setImageSize] = useState<"1K" | "2K" | "4K">("1K");
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16">("16:9");
  const [isGenerating, setIsGenerating] = useState(false);
  const [projects, setProjects] = useState<AIProject[]>([]);
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  
  // Voice state
  const [isLive, setIsLive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcription, setTranscription] = useState<string[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sessionRef = useRef<any>(null);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "ai_projects"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as AIProject[];
      setProjects(projectData.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()));
    });

    return () => unsubscribe();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateImage = async () => {
    if (!prompt.trim() || isGenerating) return;
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      alert("Please configure your GEMINI_API_KEY in the app settings to use the AI Design Lab.");
      return;
    }

    setIsGenerating(true);

    try {
      const ai = new GoogleGenAI({ apiKey });
      
      let imageUrl = "";
      
      if (uploadImage) {
        // Image Editing
        const response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-image-preview',
          contents: {
            parts: [
              { inlineData: { data: uploadImage.split(',')[1], mimeType: "image/png" } },
              { text: prompt }
            ]
          }
        });
        
        const imagePart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
        if (imagePart?.inlineData) {
          imageUrl = `data:image/png;base64,${imagePart.inlineData.data}`;
        }
      } else {
        // Image Generation
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-image-preview',
          contents: { parts: [{ text: prompt }] },
          config: {
            imageConfig: {
              imageSize: imageSize,
              aspectRatio: "16:9"
            },
            tools: [{ googleSearch: {} }] // Search grounding
          }
        });

        const imagePart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
        if (imagePart?.inlineData) {
          imageUrl = `data:image/png;base64,${imagePart.inlineData.data}`;
        }
      }

      if (imageUrl && auth.currentUser) {
        await addDoc(collection(db, "ai_projects"), {
          userId: auth.currentUser.uid,
          prompt,
          type: "image",
          url: imageUrl,
          createdAt: serverTimestamp()
        });
        setPrompt("");
        setUploadImage(null);
      }
    } catch (error) {
      console.error("Image generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateVideo = async () => {
    if (!uploadImage || isGenerating) return;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      alert("Please configure your GEMINI_API_KEY in the app settings to use the AI Design Lab.");
      return;
    }

    setIsGenerating(true);

    try {
      const ai = new GoogleGenAI({ apiKey });
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt || "Animate this car design in a cinematic way",
        image: {
          imageBytes: uploadImage.split(',')[1],
          mimeType: 'image/png',
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: aspectRatio
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink && auth.currentUser) {
        await addDoc(collection(db, "ai_projects"), {
          userId: auth.currentUser.uid,
          prompt: prompt || "Cinematic animation",
          type: "video",
          url: downloadLink,
          createdAt: serverTimestamp()
        });
        setPrompt("");
        setUploadImage(null);
      }
    } catch (error) {
      console.error("Video generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const startVoice = async () => {
    if (isLive) {
      stopVoice();
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      alert("Please configure your GEMINI_API_KEY in the app settings to use the AI Design Lab.");
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new AudioContext({ sampleRate: 16000 });
      
      const session = await ai.live.connect({
        model: "gemini-2.5-flash-native-audio-preview-12-2025",
        callbacks: {
          onopen: () => {
            setIsLive(true);
            setTranscription(["Connection established. Speak now..."]);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.modelTurn?.parts[0]?.inlineData?.data) {
              const base64Audio = message.serverContent.modelTurn.parts[0].inlineData.data;
              // Play audio logic here
            }
            if (message.serverContent?.modelTurn?.parts[0]?.text) {
              setTranscription(prev => [...prev.slice(-5), message.serverContent!.modelTurn!.parts[0].text!]);
            }
          },
          onclose: () => stopVoice(),
          onerror: (err) => console.error("Live API error:", err)
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: "You are the Throttle X Voice Assistant. You help users design their dream cars. Be enthusiastic and technical."
        }
      });

      sessionRef.current = session;
    } catch (error) {
      console.error("Voice start error:", error);
    }
  };

  const stopVoice = () => {
    setIsLive(false);
    streamRef.current?.getTracks().forEach(track => track.stop());
    sessionRef.current?.close();
    audioContextRef.current?.close();
  };

  const deleteProject = async (id: string) => {
    try {
      await deleteDoc(doc(db, "ai_projects", id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="flex-1 bg-background-dark py-24 px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4 block"
          >
            Generative Engineering
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold uppercase italic"
          >
            AI <span className="text-primary">Design Lab</span>
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-8">
            <div className="glass-panel rounded-3xl p-8 border border-white/5">
              <div className="flex gap-2 mb-8 bg-white/5 p-1 rounded-xl">
                <button 
                  onClick={() => setActiveTab("image")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold transition-all ${activeTab === "image" ? "bg-primary text-white" : "text-slate-500 hover:text-white"}`}
                >
                  <ImageIcon size={16} /> IMAGE
                </button>
                <button 
                  onClick={() => setActiveTab("video")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold transition-all ${activeTab === "video" ? "bg-primary text-white" : "text-slate-500 hover:text-white"}`}
                >
                  <Video size={16} /> VIDEO
                </button>
                <button 
                  onClick={() => setActiveTab("voice")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold transition-all ${activeTab === "voice" ? "bg-primary text-white" : "text-slate-500 hover:text-white"}`}
                >
                  <Mic size={16} /> VOICE
                </button>
              </div>

              {activeTab !== "voice" && (
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500 mb-3 block tracking-widest">Prompt</label>
                    <textarea 
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder={activeTab === "image" ? "e.g. A widebody BMW F90 in matte emerald green with BBS wheels..." : "Describe the animation style..."}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:border-primary outline-none min-h-[120px] transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500 mb-3 block tracking-widest">Reference Image (Optional)</label>
                    <div className="relative group">
                      {uploadImage ? (
                        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
                          <img src={uploadImage} className="w-full h-full object-cover" />
                          <button 
                            onClick={() => setUploadImage(null)}
                            className="absolute top-2 right-2 size-8 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center aspect-video bg-white/5 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:border-primary/50 transition-all">
                          <ImageIcon className="text-slate-600 mb-2" size={32} />
                          <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Upload Design</span>
                          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                        </label>
                      )}
                    </div>
                  </div>

                  {activeTab === "image" && !uploadImage && (
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 mb-3 block tracking-widest">Quality</label>
                      <div className="flex gap-2">
                        {(["1K", "2K", "4K"] as const).map(size => (
                          <button 
                            key={size}
                            onClick={() => setImageSize(size)}
                            className={`flex-1 py-2 rounded-lg text-[10px] font-bold border transition-all ${imageSize === size ? "bg-primary/10 border-primary text-primary" : "bg-white/5 border-white/10 text-slate-500"}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "video" && (
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 mb-3 block tracking-widest">Aspect Ratio</label>
                      <div className="flex gap-2">
                        {(["16:9", "9:16"] as const).map(ratio => (
                          <button 
                            key={ratio}
                            onClick={() => setAspectRatio(ratio)}
                            className={`flex-1 py-2 rounded-lg text-[10px] font-bold border transition-all ${aspectRatio === ratio ? "bg-primary/10 border-primary text-primary" : "bg-white/5 border-white/10 text-slate-500"}`}
                          >
                            {ratio === "16:9" ? "Landscape" : "Portrait"}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={activeTab === "image" ? generateImage : generateVideo}
                    disabled={isGenerating || (!prompt.trim() && !uploadImage)}
                    className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-3 hover:bg-primary/80 disabled:opacity-50 transition-all shadow-2xl shadow-primary/20"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        ENGINEERING...
                      </>
                    ) : (
                      <>
                        <Wand2 size={20} />
                        {activeTab === "image" ? (uploadImage ? "EDIT DESIGN" : "GENERATE DESIGN") : "ANIMATE DESIGN"}
                      </>
                    )}
                  </button>
                </div>
              )}

              {activeTab === "voice" && (
                <div className="space-y-8 text-center py-8">
                  <div className="relative mx-auto size-32">
                    <div className={`absolute inset-0 rounded-full bg-primary/20 animate-ping ${isLive ? 'opacity-100' : 'opacity-0'}`}></div>
                    <button 
                      onClick={startVoice}
                      className={`relative z-10 size-32 rounded-full flex items-center justify-center transition-all ${isLive ? 'bg-red-500 text-white' : 'bg-primary text-white shadow-2xl shadow-primary/40'}`}
                    >
                      {isLive ? <Square size={40} /> : <Mic size={40} />}
                    </button>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 uppercase italic">{isLive ? "Listening..." : "Voice Assistant"}</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-widest">Talk to our engineers in real-time</p>
                  </div>
                  
                  <div className="bg-white/5 rounded-2xl p-6 text-left border border-white/5 min-h-[150px]">
                    <div className="flex items-center gap-2 mb-4 text-primary">
                      <Sparkles size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Live Transcription</span>
                    </div>
                    <div className="space-y-2">
                      {transcription.map((t, i) => (
                        <p key={i} className="text-xs text-slate-400 italic leading-relaxed">
                          {t}
                        </p>
                      ))}
                      {transcription.length === 0 && (
                        <p className="text-xs text-slate-600 italic">Start conversation to see transcription...</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold uppercase italic">Recent <span className="text-primary">Creations</span></h2>
              <div className="flex items-center gap-4 text-xs text-slate-500 font-bold uppercase tracking-widest">
                <span>{projects.length} Assets</span>
              </div>
            </div>

            {projects.length === 0 ? (
              <div className="glass-panel rounded-3xl p-24 text-center border border-white/5">
                <Sparkles className="mx-auto text-slate-700 mb-6" size={48} />
                <h3 className="text-xl font-bold mb-2">No designs yet</h3>
                <p className="text-sm text-slate-500">Start generating to see your AI car concepts here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatePresence>
                  {projects.map((project) => (
                    <motion.div 
                      key={project.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="glass-panel rounded-3xl overflow-hidden border border-white/5 group"
                    >
                      <div className="relative aspect-video">
                        {project.type === "image" ? (
                          <img src={project.url} className="w-full h-full object-cover" />
                        ) : (
                          <video src={project.url} className="w-full h-full object-cover" controls />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                          <p className="text-xs text-white font-medium line-clamp-2 mb-4">{project.prompt}</p>
                          <div className="flex gap-2">
                            <button className="flex-1 py-2 bg-white/10 backdrop-blur-md rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-primary transition-colors">
                              Download
                            </button>
                            <button 
                              onClick={() => deleteProject(project.id)}
                              className="p-2 bg-red-500/20 backdrop-blur-md rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
