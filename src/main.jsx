import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import Index from './pages/Index.jsx';
import NotFound from './pages/NotFound.jsx';
import RandomQuote from './pages/RandomQuote.jsx';
import Lab from './pages/Lab.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/random-quote" element={<RandomQuote />} />
      <Route path="/lab" element={<Lab />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
