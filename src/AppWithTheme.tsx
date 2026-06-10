import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';
import App from './App';

export default function AppWithTheme() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}
