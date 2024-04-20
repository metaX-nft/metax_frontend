import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './style.css';

import App from '@pages/App';

const container = document.getElementById('app')!;

const root = createRoot(container);

root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);
