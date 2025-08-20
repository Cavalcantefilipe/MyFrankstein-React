import { BrowserRouter, Routes, Route } from 'react-router';
import { createRoot } from 'react-dom/client';
import './index.css';
import Index from './pages/Index.jsx';
import Resume from './pages/Resume.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/resume" element={<Resume />} />
    </Routes>
  </BrowserRouter>
);
