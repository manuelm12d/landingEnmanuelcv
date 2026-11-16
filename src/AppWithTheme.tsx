import App from './App';
import { ThemeModeProvider } from './context/ThemeContext';
import './styles/animations.css';

export default function AppWithTheme() {
  return (
    <ThemeModeProvider>
      <App />
    </ThemeModeProvider>
  );
}
