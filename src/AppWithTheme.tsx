import App from './App';
import { MarioThemeProvider } from './context/ThemeContext';
import './styles/mario-animations.css';

export default function AppWithTheme() {
  return (
    <MarioThemeProvider>
      <App />
    </MarioThemeProvider>
  );
}
