import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: "user" | "model";
  text: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "Welcome to Throttle X. I'm your technical specialist. How can I assist with your build today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<any>(null);

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
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        setMessages(prev => [...prev, { role: "model", text: "AI features are currently offline. Please configure the GEMINI_API_KEY in the AI Studio Settings to enable the specialist chat." }]);
        setIsLoading(false);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      
      if (!chatRef.current) {
        chatRef.current = ai.chats.create({
          model: "gemini-3-flash-preview",
          config: {
            systemInstruction: "You are a Throttle X Specialist, an expert in high-end automotive modifications. You help users with technical questions about BMW F90 conversions, i20 projects, ECU tuning, bespoke interiors, and performance engineering. Be professional, technical, and enthusiastic about cars. If users ask about pricing or specific quotes, refer them to the Configurator or Contact page. Keep your responses concise and focused on automotive excellence.",
          },
        });
      }

      const response = await chatRef.current.sendMessage({
        message: userMessage,
      });

      const aiText = response.text || "I apologize, I'm having trouble processing that request. Please try again or contact our engineers directly.";
      setMessages(prev => [...prev, { role: "model", text: aiText }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: "model", text: "Technical error encountered. Please check your connection or try again later." }]);
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
                    <span className="size-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[10px] text-slate-400 uppercase">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white">
                <X size={18} />
              </button>
            </div>

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
                AI Assistant • Throttle X Engineering
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
