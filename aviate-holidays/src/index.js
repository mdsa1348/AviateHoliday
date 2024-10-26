import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './pages/Authentication/AuthContext';

// Get the root element from the DOM
const container = document.getElementById('root');

// Create a root using createRoot
const root = createRoot(container);

// Render the App component inside the AuthProvider
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
