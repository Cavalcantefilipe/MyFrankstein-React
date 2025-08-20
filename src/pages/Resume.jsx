import React from 'react';
import { Link } from 'react-router';
import logo from '../assets/logo.png';

function Resume() {
  // This component renders a resume page with a header and navigation links

  return (
    <div className="max-w-6xl mx-auto my-8 bg-black text-white border-amber-50 p-6 rounded-lg shadow-lg">
      <header className="bg-blue-500 text-white p-4 flex items-center justify-between">
        <img src={logo} alt="Logo" className="h-10" />
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="mt-4">
        <h1 className="font-bold text-2xl">Resume Page</h1>
        <p>This is the resume page of your application.</p>
      </main>
    </div>
  );
}

export default Resume;
