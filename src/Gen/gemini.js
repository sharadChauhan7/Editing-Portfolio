import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyA9L_qGxHJ9V8UP_aRhgxZsUZ3nIgdY-9o" });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Convert these to emojis: I love you, I'm sad, and I'm hungry.",
  });
  console.log(response.text);
}

await main();