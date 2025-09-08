const TRANSLATE_API_URL = import.meta.env.VITE_TRANSLATE_API_URL;
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export async function translateTextV2WithHeader({ text, targetLanguage, sourceLanguage = 'en' }) {
    if (!GOOGLE_API_KEY) {
        throw new Error('Google API key is not configured');
    }

    const url = 'https://translation.googleapis.com/language/translate/v2';
    const body = {
        q: text,
        target: targetLanguage,
        source: sourceLanguage,
        format: 'text'
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': GOOGLE_API_KEY
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        throw new Error('Failed to translate text');
    }

    const data = await response.json();
    const translated = data?.data?.translations?.[0]?.translatedText;
    if (!translated) {
        throw new Error('No translation returned');
    }
    return translated;
}


