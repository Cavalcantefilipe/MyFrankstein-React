import React from 'react';
import randomQuotesImg from '../assets/randomquotes.png';
import battlepokemon from '../assets/battlepokemon.png';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

function Card({ title, subtitle, date, href, imageSrc, icon }) {
  return (
    <a
      href={href}
      className="flex flex-col h-96 w-64 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-400 p-4 shadow-lg overflow-hidden group"
    >
      <div className="relative w-full aspect-square rounded-md overflow-hidden bg-white/20">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            className="h-full w-full object-fit"
            loading="lazy"
          />
        ) : null}
      </div>
      <div className="flex flex-col gap-0 mt-4 text-white">
        <h2 className="text-xl font-semibold tracking-tight leading-tight">
          {title}
        </h2>
        {subtitle ? (
          <p className="text-sm text-white/90 font-mono">{subtitle}</p>
        ) : null}
      </div>
      <div className="mt-auto flex justify-between items-center text-white">
        {date ? (
          <span className="text-[0.6rem] font-medium px-2 py-[3px] border-white/70 text-white/90 border-[1px] rounded-sm">
            {date}
          </span>
        ) : (
          <span />
        )}
        {icon ? <span className="w-6 opacity-90">{icon}</span> : null}
      </div>
    </a>
  );
}

function Lab() {
  return (
    <>
      <Header leftDownload />
      <div className="with-header-offset bg-white text-black">
        <div className="page-container py-10 min-h-[calc(90dvh-var(--header-height))]">
          <div className="max-w-6xl mx-auto">
            <h1 className="mb-6 text-3xl font-semibold text-center md:text-left">
              Lab
            </h1>
            <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] justify-items-center md:justify-items-stretch">
              <Card
                title="Random Quotes"
                subtitle="How about a random phrase translated into the language you want?"
                date="Est. 2025"
                href="/random-quote"
                imageSrc={randomQuotesImg}
                icon={
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Open</title>
                    <path
                      d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z"
                      fill="currentColor"
                    />
                    <path d="M5 5h5V3H3v7h2V5z" fill="currentColor" />
                  </svg>
                }
              />

              <Card
                title="Pokemon Battle Simulator"
                subtitle="Build your dream team and prepare for battle!"
                date="Est. 2025"
                href="/pokemon-battle"
                imageSrc={battlepokemon}
                icon={
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Open</title>
                    <path
                      d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z"
                      fill="currentColor"
                    />
                    <path d="M5 5h5V3H3v7h2V5z" fill="currentColor" />
                  </svg>
                }
              />

              {/* Placeholder for more cards */}
              <Card
                title="Coming Soon"
                subtitle="Demo"
                date="Est. 2025"
                href="#"
                imageSrc="/vite.svg"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Lab;
