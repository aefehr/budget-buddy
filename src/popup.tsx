import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';  // Your main React app component
import './content.css';

// Get the element by ID
const container = document.getElementById('popup-root');

// Check if the element exists before creating the root
if (container) {
    const root = createRoot(container);
    root.render(<App />);
} else {
    console.error('Popup root element not found');
}
