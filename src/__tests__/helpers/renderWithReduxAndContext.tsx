import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@/context/themeContext';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

export function renderWithReduxAndContext(component: React.ReactNode) {
  return render(
    <ThemeProvider>
      <Provider store={store}>{component}</Provider>
    </ThemeProvider>
  );
}
