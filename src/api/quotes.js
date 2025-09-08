const RAW_QUOTES_API_URL = import.meta.env.VITE_QUOTES_API_URL;
// Use same-origin path by default to avoid mixed content on HTTPS (proxy/rewrites needed)
const DEFAULT_QUOTES_API_URL = '/api/quotes/random';

function resolveQuotesUrl() {
    const configured = RAW_QUOTES_API_URL || DEFAULT_QUOTES_API_URL;
    const isAbsolute = /^https?:\/\//i.test(configured);
    if (isAbsolute) {
        const isHttp = configured.toLowerCase().startsWith('http://');
        const isSecurePage = typeof window !== 'undefined' && window.location?.protocol === 'https:';
        if (isHttp && isSecurePage) return DEFAULT_QUOTES_API_URL;
        return configured;
    }
    // Relative paths are safe under HTTPS (same-origin)
    return configured;
}

export async function fetchRandomQuote() {
    const endpoint = resolveQuotesUrl();
    const response = await fetch(endpoint, { cache: 'no-store' });
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


