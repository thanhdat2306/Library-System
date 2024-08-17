import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './components/Router';
import { ServerStateProvider } from './context/SeverStateContext';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ServerStateProvider>
    <AuthProvider>
      <React.StrictMode>
        <Router />
      </React.StrictMode>
    </AuthProvider>
  </ServerStateProvider>
);
