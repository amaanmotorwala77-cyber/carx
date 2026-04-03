import { GoogleGenAI } from "@google/genai";
try {
  const ai = new GoogleGenAI({ apiKey: "dummy" });
  const chat = ai.chats.create({ model: "gemini-1.5-flash" });
  console.log("Create successful, type of sendMessageStream:", typeof chat.sendMessageStream);
} catch (err) {
  console.log("Error:", err);
}
