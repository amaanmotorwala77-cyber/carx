import { GoogleGenAI } from "@google/genai";
async function run() {
  try {
    const ai = new GoogleGenAI({ apiKey: "AIzaSyCe91Yj8fAuPeGmkwCbZAcvfFAxavjggbM" });
    const chat = ai.chats.create({ model: "gemini-2.5-flash" });
    const stream = await chat.sendMessageStream({ message: "Hi" });
    for await (const chunk of stream) { console.log(chunk.text); }
  } catch (err) {
    console.log("Caught:", err.message);
  }
}
run();
