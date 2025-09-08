const RAW_QUOTES_API_URL = import.meta.env.VITE_QUOTES_API_URL;

export async function fetchRandomQuote() {
    const endpoint = RAW_QUOTES_API_URL;
    const response = await fetch(endpoint, { cache: 'no-store' });
    if (!response.ok) {
        throw new Error('Failed to fetch quote');
    }

    const data = await response.json();
    const content = data?.quote || '';
    const author = data?.author || '';
    if (!content) {
        throw new Error('Quote content not found');
    }

    return { content, author };
}