import { GoogleGenAI } from "@google/genai";
async function run() {
  console.log("Starting...");
  try {
    const ai = new GoogleGenAI({ apiKey: "AIzaSyCeNdAqDLr8tyx05hWP1Xu-0i-2Nsnd0mM" });
    const chat = ai.chats.create({ model: "gemini-1.5-flash" });
    console.log("Sending...");
    // The previous error might be because sendMessageStream accepts a string not an object?
    const stream = await chat.sendMessageStream({ message: "Hello" });
    for await (const chunk of stream) {
      console.log("Chunk:", chunk.text);
    }
  } catch (err) {
    console.log("Caught:", err);
  }
  console.log("Done");
}
run();
