import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { getApiKey } from "../ai";

interface Message {
  role: "user" | "model";
  text: string;
}

interface ChatBotProps {
  hasKey: boolean;
  onSelectKey: () => void;
}

export default function ChatBot({ hasKey, onSelectKey }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "Welcome to AI Studio. I'm your technical specialist. How can I assist with your build today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<any>(null);
  const lastApiKeyRef = useRef<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      // Always check for the most recent key
      const apiKey = getApiKey();
      
      console.log("ChatBot: Attempting to send message. API Key present:", !!apiKey);
      
      if (!apiKey) {
        // If hasKey is true but apiKey is missing, maybe it's still injecting
        if (hasKey) {
          setMessages(prev => [...prev, { role: "model", text: "AI features are initializing. Please wait a few seconds and try again." }]);
        } else {
          setMessages(prev => [...prev, { role: "model", text: "AI features are currently offline. Please click the 'Select Key' button above to enable the Free specialist chat." }]);
        }
        setIsLoading(false);
        return;
      }

      let ai;
      try {
        ai = new GoogleGenAI({ apiKey });
      } catch (e) {
        console.error("Failed to initialize GoogleGenAI:", e);
        setMessages(prev => [...prev, { role: "model", text: "Failed to initialize AI. Please refresh the page or try again later." }]);
        setIsLoading(false);
        return;
      }
      
      // Recreate chat if key changed or not created
      if (!chatRef.current || lastApiKeyRef.current !== apiKey) {
        try {
          lastApiKeyRef.current = apiKey;
            chatRef.current = ai.chats.create({
              model: "gemini-1.5-flash",
              config: {
                systemInstruction: "You are an AI Studio Specialist, an expert in high-end automotive modifications. You help users with technical questions about BMW F90 conversions, i20 projects, ECU tuning, bespoke interiors, and performance engineering. Be professional, technical, and enthusiastic about cars. If users ask about pricing or specific quotes, refer them to the Configurator or Contact page. Keep your responses concise and focused on automotive excellence.",
              },
            });
        } catch (e) {
          console.error("Failed to create chat:", e);
          setMessages(prev => [...prev, { role: "model", text: "Failed to start chat session. Please try again." }]);
          setIsLoading(false);
          return;
        }
      }

      // Add an empty model message to start streaming into
      setMessages(prev => [...prev, { role: "model", text: "" }]);

      const streamResponse = await chatRef.current.sendMessageStream({
        message: userMessage,
      });

      let fullText = "";
      for await (const chunk of streamResponse) {
        const c = chunk as GenerateContentResponse;
        const chunkText = c.text || "";
        fullText += chunkText;
        
        // Update the last message with the accumulated text
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: "model", text: fullText };
          return newMessages;
        });
      }

      if (!fullText) {
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: "model", text: "I apologize, I'm having trouble processing that request. Please try again or contact our engineers directly." };
          return newMessages;
        });
      }
    } catch (error: any) {
      console.error("Chat error:", error);
      if (error?.message?.includes("Requested entity was not found")) {
        setMessages(prev => [...prev, { role: "model", text: "Your API key session has expired or is invalid. Please click 'Select Key' again to refresh your session." }]);
        onSelectKey(); // Try to re-open selection
      } else {
        setMessages(prev => [...prev, { role: "model", text: "Technical error encountered. Please check your connection or try again later." }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-8 z-[60] size-14 rounded-full bg-primary text-white shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 transition-transform"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-40 right-8 z-[60] w-[380px] h-[500px] bg-background-dark border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest">Build Specialist</h3>
                  <div className="flex items-center gap-1.5">
                    <span className={`size-1.5 rounded-full ${hasKey ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                    <span className="text-[10px] text-slate-400 uppercase">{hasKey ? 'Online' : 'Offline'}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {hasKey && (
                  <button 
                    onClick={() => {
                      chatRef.current = null;
                      lastApiKeyRef.current = null;
                      setMessages([{ role: "model", text: "Session reset. How can I help you now?" }]);
                    }}
                    className="text-[9px] text-slate-500 hover:text-primary uppercase font-bold tracking-widest"
                  >
                    Reset
                  </button>
                )}
                <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Key Selection Banner */}
            {!hasKey && (
              <div className="p-3 bg-primary/10 border-b border-primary/20 flex flex-col gap-2">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[10px] text-primary font-bold uppercase tracking-wider">Free API Key Required (<a href="https://aistudio.google.com/app/apikey" target="_blank" className="underline">Get Key</a>)</p>
                  <button 
                    onClick={onSelectKey}
                    className="px-3 py-1 bg-primary text-white rounded-lg text-[9px] font-bold uppercase hover:bg-primary/80 transition-all"
                  >
                    Select Key
                  </button>
                </div>
                <p className="text-[8px] text-slate-500 uppercase tracking-tight leading-relaxed">
                  If you are using a Shared or Deployed link, please set your <code className="bg-white/10 px-0.5 rounded text-primary">GEMINI_API_KEY</code> in the environment variables via the Settings menu in AI Studio.
                </p>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-3 rounded-xl text-sm ${
                    msg.role === "user" 
                      ? "bg-primary text-white rounded-tr-none" 
                      : "bg-white/5 border border-white/10 text-slate-300 rounded-tl-none"
                  }`}>
                    <div className="flex items-center gap-2 mb-1 opacity-50 text-[10px] uppercase font-bold">
                      {msg.role === "user" ? <User size={10} /> : <Sparkles size={10} />}
                      {msg.role === "user" ? "Client" : "Specialist"}
                    </div>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-xl rounded-tl-none">
                    <Loader2 size={18} className="text-primary animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-white/5">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about your build..."
                  className="w-full bg-background-dark border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm focus:border-primary outline-none transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 size-8 rounded-lg bg-primary text-white flex items-center justify-center hover:bg-primary/80 disabled:opacity-50 disabled:hover:bg-primary transition-all"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-[9px] text-center text-slate-600 mt-3 uppercase tracking-widest">
                AI Assistant • AI Studio <span className="text-[8px] bg-primary/20 px-1.5 py-0.5 rounded ml-1">FT2</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
