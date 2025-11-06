import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 👈 Import de React Router
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Enveloppement de l'application avec BrowserRouter */}
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </StrictMode>
);