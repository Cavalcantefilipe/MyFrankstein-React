import { apiFetch } from './client';

export type TranslateTextInput = {
  text: string;
  targetLanguage: string;
  sourceLanguage?: string;
};

export async function translateText({
  text,
  targetLanguage,
  sourceLanguage = 'en',
}: TranslateTextInput): Promise<string> {
  const data = await apiFetch<{ translated_text?: string }>('/translate', {
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
