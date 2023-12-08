import { NextResponse } from "next/server";
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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', // defaults to process.env["OPENAI_API_KEY"]
});

async function main() {
  const params = {
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'gpt-3.5-turbo',
  };
  
  try {
    const chatCompletion = await openai.completions.create(params); // Use "completions" instead of "chat.completions"
    console.log(chatCompletion.choices[0].text);
  } catch (error) {
    console.error(error);
  }
}

main();
