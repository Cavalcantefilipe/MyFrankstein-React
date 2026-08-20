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
              className="rounded-md border border-white/[.12] px-3 py-1 min-w-48 text-left text-fg transition-colors hover:border-accent/50"
            >
              {selectedLabel}
            </button>
            {isDropdownOpen ? (
              <div className="absolute z-20 mt-1 w-72 rounded-md border border-white/[.08] bg-raised shadow-lg">
                <div className="p-2 border-b border-white/[.08]">
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search language..."
                    value={languageSearch}
                    onChange={(e) => setLanguageSearch(e.target.value)}
                    className="w-full rounded border border-white/[.12] bg-ink px-2 py-1 text-fg placeholder:text-faint focus:border-accent focus:outline-none"
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
                        className={`block w-full px-3 py-2 text-left transition-colors hover:bg-white/[.06] ${
                          opt.code === targetLanguage
                            ? 'bg-accent/15 text-accent'
                            : 'text-fg'
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
          className="rounded-md border border-accent/40 px-4 py-2 text-accent transition-colors hover:bg-accent/10 disabled:opacity-50"
        >
          {isLoading ? 'Loading…' : 'Generate'}
        </button>
      </div>

      {errorMessage ? (
        <div className="mb-3 text-red-400">{errorMessage}</div>
      ) : null}

      {original.content ? (
        <div className="grid gap-3 text-center md:text-left">
          <blockquote className="rounded-md border border-white/[.08] bg-white/[.03] p-4">
            <p className="m-0 text-lg">&ldquo;{original.content}&rdquo;</p>
            {original.author ? (
              <cite className="mt-2 block not-italic text-muted">
                — {original.author}
              </cite>
            ) : null}
          </blockquote>

          {translatedContent && targetLanguage !== 'none' ? (
            <blockquote className="rounded-md border border-white/[.08] bg-white/[.015] p-4">
              <p className="m-0 text-lg">&ldquo;{translatedContent}&rdquo;</p>
              {original.author ? (
                <cite className="mt-2 block not-italic text-muted">
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
