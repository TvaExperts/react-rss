import ReactDOM from 'react-dom/client';
import { App } from './App';
import { ErrorBoundary } from './components/errorBoundary/errorBoundary';
import { Fallback } from './components/fallback/fallback';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <ErrorBoundary fallback={<Fallback />}>
      <App />
    </ErrorBoundary>
  );
}
