import { apiFetch } from './client';

export type RandomQuote = {
  content: string;
  author: string;
};

export async function fetchRandomQuote(): Promise<RandomQuote> {
  const data = await apiFetch<{ quote?: string; author?: string }>(
    '/quotes/random'
  );
  const content = data?.quote || '';
  const author = data?.author || '';
  if (!content) {
    throw new Error('Quote content not found');
  }
  return { content, author };
}
