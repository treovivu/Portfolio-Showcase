import { createRoot } from 'react-dom/client';
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';

import App from './App';
import { ErrorBoundary } from '@/components/error-boundary';

import './index.css';

createRoot(document.getElementById('root')!, {
  // Keeps caught errors off reportError(), which would raise the dev overlay.
  onCaughtError: (error, errorInfo) => {
    console.error(error, errorInfo.componentStack);
  },
}).render(
  <ErrorBoundary>
    {/* domAnimation keeps the motion bundle small; reducedMotion="user" honours prefers-reduced-motion. */}
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </LazyMotion>
  </ErrorBoundary>,
);
