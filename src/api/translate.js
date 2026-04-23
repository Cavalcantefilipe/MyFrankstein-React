import { apiFetch } from './client.js';

export async function translateText({ text, targetLanguage, sourceLanguage = 'en' }) {
    const data = await apiFetch('/translate', {
        method: 'POST',
        body: JSON.stringify({
            text,
            target_lang: targetLanguage,
            source_lang: sourceLanguage,
        }),
    });
    const translated = data?.translated_text;
    if (!translated) {
        throw new Error('No translation returned');
    }
    return translated;
}
