const QUOTES_API_URL = import.meta.env.VITE_QUOTES_API_URL;

export async function fetchRandomQuote() {
    if (!QUOTES_API_URL) {
        throw new Error('Quotes API URL is not configured');
    }

    const response = await fetch(QUOTES_API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch quote');
    }

    const data = await response.json();
    const content = data?.content || '';
    const author = data?.author || '';
    if (!content) {
        throw new Error('Quote content not found');
    }

    return { content, author };
}


