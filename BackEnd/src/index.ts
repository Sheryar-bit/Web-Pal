// require('dotenv').config();

// // const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// // const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;


import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

async function main() {
    //tell which model we arr using
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContentStream({
    contents: [
        { 
            role: "user", 
            parts: [{text: "Write a code for a todo application" }] 
        }
    ],
  });

  //will loop thorugh the each chunk of the streamedd responce'
  for await (const chunk of result.stream) {
    const text = chunk.text(); //will exract the text from the chunk
    if (text) process.stdout.write(text); // streaming output (like will be giving code line by line as GPT and gemini gives )
  }
}

main();
