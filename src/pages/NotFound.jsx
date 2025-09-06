import React from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

function NotFound() {
  return (
    <>
      <Header />
      <main className="with-header-offset page-container min-h-[calc(100dvh-var(--header-height))] grid place-content-center py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404 - Page not found</h1>
          <p className="text-gray-600 mb-6">The page you are looking for doesn’t exist or was moved.</p>
          <a href="/" className="px-4 py-2 rounded-md border">Go back home</a>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default NotFound;


