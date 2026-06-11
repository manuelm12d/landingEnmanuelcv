import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppWithTheme from './AppWithTheme';

if (import.meta.env.MODE === 'production') {
  import('./lib/firebase');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWithTheme />
  </StrictMode>,
);
