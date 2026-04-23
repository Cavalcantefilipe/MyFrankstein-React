import { apiFetch } from './client.js';

export async function fetchRandomQuote() {
    const data = await apiFetch('/quotes/random');
    const content = data?.quote || '';
    const author = data?.author || '';
    if (!content) {
        throw new Error('Quote content not found');
    }
    return { content, author };
}
