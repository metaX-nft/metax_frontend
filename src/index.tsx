import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config } from './config';

const queryClient = new QueryClient();

import './style.css';

import App from '@pages/App';

const container = document.getElementById('app');

// 动态设置 html 字体大小
(function () {
  function setFontSize() {
    let rootElement = document.documentElement;
    const rootWidth = rootElement.clientWidth < 1366 ? 1366 : rootElement.clientWidth;
    rootElement.style.fontSize = `${(rootWidth / 1920) * 16}px`;
  }

  setFontSize();
  window.addEventListener('resize', setFontSize, false);
})();

if (container) {
  const root = createRoot(container);

  root.render(
    <BrowserRouter>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </WagmiProvider>
    </BrowserRouter>,
  );
}
