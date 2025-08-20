import React, { useState } from 'react';
import cv from '../assets/Filipe Alves Cavalcante - CV.pdf';

function Header() {
  const handleDownload = () => {
    const fileUrl = cv;
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'Filipe_Cavalcante_CV.pdf'; // Specify the desired filename for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsMobileMenuOpen(false);
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="relative">
      <div className="container mx-auto px-5 pt-5 lg:px-20">
        <nav>
          <div className="flex items-center justify-between pb-3">
            <a
              className="text-[15px] font-medium italic sm:text-base md:text-[24px] lg:font-bold"
              href="/"
            >
              &lt;Filipe
              <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                Lab/&gt;.
              </span>
            </a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-list size-6 cursor-pointer md:size-8 lg:hidden"
              viewBox="0 0 16 16"
              onClick={toggleMobileMenu}
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
            <div className="hidden gap-6 font-medium lg:flex xl:gap-8">
              <a
                className="my-5 transition-opacity duration-75 hover:opacity-50"
                href="/#about"
              >
                About
              </a>
              <button
                onClick={handleDownload}
                className="my-5 flex items-center gap-3 transition-opacity duration-75 hover:opacity-50"
              >
                <span>Download CV</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div
            className={`absolute left-0 top-14 w-full bg-white shadow-lg transition-all duration-300 lg:hidden ${
              isMobileMenuOpen
                ? 'opacity-100 z-10 p-5'
                : 'opacity-0 -z-10 p-0 overflow-hidden'
            }`}
            style={{
              height: isMobileMenuOpen ? 'auto' : '0px',
            }}
          >
            <div className="container mx-auto flex flex-col px-5 font-medium">
              <a
                className="my-5 transition-opacity duration-75 hover:opacity-50"
                href="/#about"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <button
                className=" my-5 flex items-center gap-2 transition-opacity duration-75 hover:opacity-50"
                onClick={handleDownload}
              >
                <span>Download CV</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
