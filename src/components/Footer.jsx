import React from 'react';
import { FaLinkedin, FaGlobe, FaEnvelope } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-white">
      <div className="page-container py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 sm:justify-between justify-center text-center">
          <p className="text-sm text-black/80 w-full sm:w-auto">© {new Date().getFullYear()} Filipe Alves Cavalcante. All rights reserved.</p>
          <div className="flex items-center gap-4 text-black/80 mx-auto sm:mx-0">
            <a href="mailto:filipe.alvescavalcante@gmail.com" aria-label="Email" className="hover:text-black">
              <FaEnvelope />
            </a>
            <a href="https://www.linkedin.com/in/cavalcante-filipe/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-black">
              <FaLinkedin />
            </a>
            <a href="https://filipelab.com" target="_blank" rel="noreferrer" aria-label="Website" className="hover:text-black">
              <FaGlobe />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;


