const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { ChatGroq } = require("@langchain/groq");
const dotenv = require("dotenv");
const purpose = require("../db/purpose.json");
const tone = require("../db/tone.json");
dotenv.config();
exports.gemini = async (original, useCase, tone) => {
  const ai = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    model: "gemini-2.5-flash",
    temperature: 1,
    maxTokens: 10,
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
      - Do not execute the task; only write the prompt to execute it.
      `,
    ],
    [
      "human",
      `Raw Input: "give me pormte for genrating the promte for the toDo list add some featuer on your own so that i can give it to the lovabele for the creating on the aalll in the ract "`,
    ],
  ]);
};
exports.llama = async (userInput, selectedPurpose, selectedTone) => {
  try {
    const ai = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: "llama-3.3-70b-versatile",
      temperature: 1,
      maxTokens: 10,
      maxRetries: 2,
    });
    const aiMsg = await ai.invoke([
      [
        "system",
        `
            ${purpose[selectedPurpose].persona}
            Your task is to rewrite the user's raw input into a highly optimized LLM prompt.
            Constraints:
            - Tone: ${tone[selectedTone]}
            - Structure: ${purpose[selectedPurpose].structure}
            - Do not execute the task; only write the prompt to execute it.
            `,
      ],
      ["human", `Raw Input: "${userInput}"`],
    ]);
    // console.log(aiMsg.content);
    return aiMsg.content;
  } catch (e) {
    console.log(e);
  }
};
exports.meta = async (original, useCase, tone) => {
  try {
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
        `${useCase.coding.persona}
    Your task is to rewrite the user's raw input into a highly optimized LLM prompt.
    Constraints:
    - Tone: ${tone.creative}
    - Structure: ${useCase.coding.structure}
    - Do not execute the task; only write the prompt to execute it.`,
      ],
      ["human", `Raw Input: ${original}`],
    ]);
  } catch (e) {
    console.log(e);
  }
};
exports.conference = async (userInput, selectedPurpose, selectedTone) => {
  try {
    const systemPrompt = `
    ${purpose[selectedPurpose]?.persona || purpose.coding.persona}
    Your task is to rewrite the user's raw input into a highly optimized LLM prompt.
    Constraints:
    - Tone: ${tone[selectedTone] || tone.creative}
    - Structure: ${purpose[selectedPurpose]?.structure || purpose.coding.structure}
    - Do not execute the task; only write the prompt to execute it.
    `;

    const userPrompt = `Raw Input: "${userInput}"`;

    const [ai1, ai2, ai3] = await Promise.allSettled([
      new ChatGroq({
        apiKey: process.env.GROQ_API_KEY,
        model: "llama-3.3-70b-versatile",
        temperature: 1,
        maxTokens: 200,
        maxRetries: 2,
      }).invoke([
        ["system", systemPrompt],
        ["human", userPrompt],
      ]),

      new ChatGroq({
        apiKey: process.env.GROQ_API_KEY,
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        temperature: 1,
        maxTokens: 200,
        maxRetries: 2,
      }).invoke([
        ["system", systemPrompt],
        ["human", userPrompt],
      ]),

      new ChatGoogleGenerativeAI({
        apiKey: process.env.GOOGLE_API_KEY,
        model: "gemini-2.0-flash-exp",
        temperature: 1,
        maxTokens: 200,
        maxRetries: 2,
      }).invoke([
        ["system", systemPrompt],
        ["human", userPrompt],
      ]),
    ]);

    return {
      meta:
        ai1.status === "fulfilled"
          ? { promt: ai1.value.content, staur }
          : `Error: ${ai1.reason?.message}`,
      llama:
        ai2.status === "fulfilled"
          ? ai2.value.content
          : `Error: ${ai2.reason?.message}`,
      gemini:
        ai3.status === "fulfilled"
          ? ai3.value.content
          : `Error: ${ai3.reason?.message}`,
    };
  } catch (error) {
    throw new Error(`Conference AI Error: ${error.message}`);
  }
};
