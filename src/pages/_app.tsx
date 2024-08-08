import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper } from '@/store/store';
import { ThemeProvider } from '@/context/themeContext';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <ThemeProvider>
      <Provider store={store}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />;
      </Provider>
    </ThemeProvider>
  );
}
