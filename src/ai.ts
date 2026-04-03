import { GoogleGenAI } from "@google/genai";

export const getApiKey = (): string => {
  // Priority: 
  // 1. window.GEMINI_API_KEY (populated from server-side secrets)
  // 2. process.env.GEMINI_API_KEY (Vite define)
  // 3. import.meta.env.VITE_GEMINI_API_KEY
  return (window as any).GEMINI_API_KEY || 
         process.env.GEMINI_API_KEY || 
         process.env.API_KEY || 
         (import.meta as any).env?.VITE_GEMINI_API_KEY || 
         "AIzaSyCeNdAqDLr8tyx05hWP1Xu-0i-2Nsnd0mM";
};

export const createAI = () => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("Gemini API Key is missing. Please set it in AI Studio Settings or select it.");
  }
  return new GoogleGenAI({ apiKey });
};
