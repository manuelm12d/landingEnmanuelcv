import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppWithTheme from './AppWithTheme';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWithTheme />
  </StrictMode>,
);
