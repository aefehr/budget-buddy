import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './content.css';

// Check if the page is a product page (this is a basic check; you can refine this)
const productPageIndicators = [
    document.querySelector('button[aria-label*="add to bag"]'),  // Checking for Add to Bag button
    document.querySelector('.price'),  // Checking for price elements
    document.querySelector('.product-title'),  // Checking for product titles
    document.querySelector('[id*="product"]')   // Checking for product detail container
];

const isProductPage = productPageIndicators.some(indicator => indicator !== null);

if (isProductPage) {
    injectFloatingButton();
}

function injectFloatingButton() {
    console.log('Injecting floating button...');

    // Create the button element
    const button = document.createElement('div');
    button.id = 'floating-button';
    button.innerText = '$';  // Dollar sign or any icon

    // Add transition styles to the button
    button.style.transition = 'right 0.3s ease-in-out';

    // Append the button to the body
    document.body.appendChild(button);
    console.log('Button appended to body');

    // Create the panel container but don't display it yet
    const panelContainer = document.createElement('div');
    panelContainer.id = 'panel';
    panelContainer.style.display = 'none'; // Hidden by default
    document.body.appendChild(panelContainer);

    // Attach Shadow DOM to the container
    const shadowRoot = panelContainer.attachShadow({ mode: 'open' });
    console.log('Shadow root created:', shadowRoot);

    // Inject initial styles to reset everything inside the shadow root
    const styleReset = document.createElement('style');
    styleReset.textContent = `:host { all: initial; }`;
    shadowRoot.appendChild(styleReset);

    // Load the CSS into the shadow root
    fetch(chrome.runtime.getURL('content.css'))
        .then(response => response.text())
        .then(cssContent => {
            const style = document.createElement('style');
            style.textContent = cssContent;
            shadowRoot.appendChild(style);
            console.log('CSS loaded and injected into shadow root');
        })
        .catch(error => {
            console.error('Failed to load content.css:', error);
        });

    // Create the root element for React to render into
    const reactRoot = document.createElement('div');
    shadowRoot.appendChild(reactRoot);

    // Render the React app into the shadow root
    createRoot(reactRoot).render(<App />);
    console.log('React Popup component rendered into shadow root');

    // Add event listener to the button to toggle the panel visibility
    button.addEventListener('click', () => {
        console.log('Floating button clicked');
        if (panelContainer.style.display === 'none' || !panelContainer.style.display) {
            // Slide button to the right and show the panel
            button.style.right = '320px';
            panelContainer.style.display = 'flex';
            console.log('Panel shown');
        } else {
            // Slide button back and hide the panel
            button.style.right = '0px';
            panelContainer.style.display = 'none';
            console.log('Panel hidden');
        }
    });

    // Add an exit button inside the panel to close it
    const exitButton = document.createElement('div');
    exitButton.className = 'exit-button';
    exitButton.innerText = '×';
    exitButton.style.cursor = 'pointer';
    shadowRoot.appendChild(exitButton);

    // Event listener to close the panel
    exitButton.addEventListener('click', () => {
        button.style.right = '0px';  // Slide button back
        panelContainer.style.display = 'none';
        console.log('Panel closed');
    });
}











