import { Message } from '@/types/chat';
import { OllamaModel } from '@/types/ollama';

import { OLLAMA_HOST } from '../app/const';

import {
  ParsedEvent,
  ReconnectInterval,
  createParser,
} from 'eventsource-parser';

export class OllamaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OllamaError';
  }
}

export const OllamaStream = async (
  model: string,
  systemPrompt: string,
  temperature : number,
  prompt: string,
) => {
  let url = `${OLLAMA_HOST}/documents/chat`;
  const res = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    },
    method: 'POST',
    body: JSON.stringify({
      query: prompt,
    }),
  });

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  if (res.status !== 200) {
    const result = await res.json();
    if (result.error) {
      throw new OllamaError(
        result.error
      );
    } 
  }

  const responseStream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of res.body as any) {
          const text = decoder.decode(chunk); 
          const parsedData = JSON.parse(text); 
          
          if (parsedData.choices[0].delta.content) {
            controller.enqueue(encoder.encode(parsedData.choices[0].delta.content)); 
          }
        }
        controller.close();
      } catch (e) {
        controller.error(e);
      }
    },
  });
  
  return responseStream;
};