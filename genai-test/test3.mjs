import { GoogleGenAI } from "@google/genai";
async function run() {
  const models = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-pro"];
  const ai = new GoogleGenAI({ apiKey: "AIzaSyCeNdAqDLr8tyx05hWP1Xu-0i-2Nsnd0mM" });
  for (const m of models) {
    try {
      const chat = ai.chats.create({ model: m });
      const stream = await chat.sendMessageStream({ message: "Hi" });
      for await (const chunk of stream) { }
      console.log(m, "WORKS");
    } catch (e) {
      console.log(m, "FAILED:", e.message ? e.message.substring(0, 100) : "Unknown");
    }
  }
}
run();
