const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { ChatGroq } = require("@langchain/groq");
const dotenv = require("dotenv");
const purpose = require("../db/purpose.json");
const tone = require("../db/tone.json");
dotenv.config();
exports.gemini = async () => {
  const ai = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    model: "gemini-2.5-flash",
    temperature: 1,
    maxTokens: 50,
    maxRetries: 2,
  });
  aiMsg = await ai.invoke([
    [
      "system",
      `
      ${purpose.coding.persona}
      Your task is to rewrite the user's raw input into a highly optimized LLM prompt.
      Constraints:
      - Tone: ${tone.creative}
      - Structure: ${purpose.coding.structure}
      - Do not execute the task; only write the prompt to execute it.
      `,
    ],
    [
      "human",
      `Raw Input: "give me pormte for genrating the promte for the toDo list add some featuer on your own so that i can give it to the lovabele for the creating on the aalll in the ract "`,
    ],
  ]);
};
exports.llama = async () => {
  const ai = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.3-70b-versatile",
    temperature: 1,
    maxTokens: 50,
    maxRetries: 2,
  });
  aiMsg = await ai.invoke([
    [
      "system",
      `
      ${purpose.coding.persona}
      Your task is to rewrite the user's raw input into a highly optimized LLM prompt.
      Constraints:
      - Tone: ${tone.creative}
      - Structure: ${purpose.coding.structure}
      - Do not execute the task; only write the prompt to execute it.
      `,
    ],
    [
      "human",
      `Raw Input: "give me pormte for genrating the promte for the toDo list add some featuer on your own so that i can give it to the lovabele for the creating on the aalll in the ract "`,
    ],
  ]);
};
exports.meta = async () => {
  const ai = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    temperature: 1,
    maxTokens: 50,
    maxRetries: 2,
  });
  aiMsg = await ai.invoke([
    [
      "system",
      `${purpose.coding.persona}
      Your task is to rewrite the user's raw input into a highly optimized LLM prompt.
      Constraints:
      - Tone: ${tone.creative}
      - Structure: ${purpose.coding.structure}
      - Do not execute the task; only write the prompt to execute it.`,
    ],
    [
      "human",
      `Raw Input: "give me pormte for genrating the promte for the toDo list add some featuer on your own so that i can give it to the lovabele for the creating on the aalll in the ract "`,
    ],
  ]);
};
exports.conerence = async () => {
  const ai1 = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    temperature: 1,
    maxTokens: 50,
    maxRetries: 2,
  });
  const ai2 = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.3-70b-versatile",
    temperature: 1,
    maxTokens: 50,
    maxRetries: 2,
  });
  const ai3 = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    model: "gemini-2.5-flash",
    temperature: 1,
    maxTokens: 50,
    maxRetries: 2,
  });
};
