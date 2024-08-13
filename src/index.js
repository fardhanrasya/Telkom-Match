import React from 'react';
import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root'); // Your root element in the HTML
const root = createRoot(rootElement);
root.render(<App />);