'use client';

import { useEffect, useRef, useState } from 'react';
import { fetchRandomQuote } from '@/api/quotes';
import { translateText } from '@/api/translate';
import { languages, normalizeLanguageCode } from '@/data/languages.js';

const baseOptions = [{ code: 'none', label: 'Original' }];

export function RandomQuoteClient() {
  const [targetLanguage, setTargetLanguage] = useState('none');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [original, setOriginal] = useState({ content: '', author: '' });
  const [translatedContent, setTranslatedContent] = useState('');
  const [languageSearch, setLanguageSearch] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredLanguages = languages.filter(
    (l: { code: string; label: string }) => {
      const q = languageSearch.trim().toLowerCase();
      if (!q) return true;
      return (
        l.label.toLowerCase().includes(q) || l.code.toLowerCase().includes(q)
      );
    }
  );

  async function handleGenerate() {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const { content, author } = await fetchRandomQuote();
      setOriginal({ content, author });
      setTranslatedContent('');

      if (targetLanguage !== 'none') {
        const normalized = normalizeLanguageCode(targetLanguage);
        const translated = await translateText({
          text: content,
          sourceLanguage: 'en',
          targetLanguage: normalized,
        });
        setTranslatedContent(translated);
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong'
      );
      setOriginal({ content: '', author: '' });
      setTranslatedContent('');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function retranslate() {
      if (!original.content) return;
      if (targetLanguage === 'none') {
        setTranslatedContent('');
        return;
      }
      setIsLoading(true);
      setErrorMessage('');
      try {
        const normalized = normalizeLanguageCode(targetLanguage);
        const translated = await translateText({
          text: original.content,
          sourceLanguage: 'en',
          targetLanguage: normalized,
        });
        setTranslatedContent(translated);
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : 'Failed to translate'
        );
        setTranslatedContent('');
      } finally {
        setIsLoading(false);
      }
    }
    retranslate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetLanguage]);

  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    function onDocKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsDropdownOpen(false);
    }
    document.addEventListener('mousedown', onDocMouseDown);
    document.addEventListener('keydown', onDocKeyDown);
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown);
      document.removeEventListener('keydown', onDocKeyDown);
    };
  }, []);

  const selectedLabel =
    targetLanguage === 'none'
      ? 'Original'
      : languages.find((l: { code: string }) => l.code === targetLanguage)
          ?.label || targetLanguage;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-wrap items-end gap-3 mb-4 justify-center md:justify-start">
        <div className="flex flex-col">
          <label className="text-sm mb-1">Language</label>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen((v) => !v)}
              className="border border-black/20 rounded-md px-3 py-1 min-w-48 text-left"
            >
              {selectedLabel}
            </button>
            {isDropdownOpen ? (
              <div className="absolute z-20 mt-1 w-72 rounded-md border border-black/20 bg-white shadow-sm">
                <div className="p-2 border-b border-black/10">
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search language..."
                    value={languageSearch}
                    onChange={(e) => setLanguageSearch(e.target.value)}
                    className="w-full border border-black/20 rounded px-2 py-1"
                  />
                </div>
                <div className="max-h-64 overflow-auto py-1">
                  {baseOptions
                    .concat(filteredLanguages)
                    .map((opt: { code: string; label: string }) => (
                      <button
                        key={opt.code}
                        type="button"
                        onClick={() => {
                          setTargetLanguage(opt.code);
                          setLanguageSearch('');
                          setIsDropdownOpen(false);
                        }}
                        className={`block w-full text-left px-3 py-2 hover:bg-black/5 ${
                          opt.code === targetLanguage ? 'bg-black/5' : ''
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="px-4 py-2 rounded-md border border-black hover:bg-black/5 disabled:opacity-50"
        >
          {isLoading ? 'Loading…' : 'Generate'}
        </button>
      </div>

      {errorMessage ? (
        <div className="text-red-600 mb-3">{errorMessage}</div>
      ) : null}

      {original.content ? (
        <div className="grid gap-3 text-center md:text-left">
          <blockquote className="rounded-md border border-black/10 bg-black/[0.02] p-4">
            <p className="m-0 text-lg">&ldquo;{original.content}&rdquo;</p>
            {original.author ? (
              <cite className="block mt-2 not-italic text-black/70">
                — {original.author}
              </cite>
            ) : null}
          </blockquote>

          {translatedContent && targetLanguage !== 'none' ? (
            <blockquote className="rounded-md border border-black/10 bg-black/[0.01] p-4">
              <p className="m-0 text-lg">
                &ldquo;{translatedContent}&rdquo;
              </p>
              {original.author ? (
                <cite className="block mt-2 not-italic text-black/70">
                  — {original.author}
                </cite>
              ) : null}
            </blockquote>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
