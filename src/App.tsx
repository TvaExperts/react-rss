import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import './global.css';
import { ThemeProvider } from './context/themeContext';

export function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />;
    </ThemeProvider>
  );
}
