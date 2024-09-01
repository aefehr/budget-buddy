import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './content.css';

// Function to check if the URL contains specific keywords
function checkUrlForKeywords() {
    const urlKeywords = ['product', 'listing', 'shop'];
    return urlKeywords.some(keyword => window.location.href.includes(keyword));
}

// Function to check for the presence of an "Add to Cart" button
function checkForAddToCartButton() {
    return document.querySelector('button[aria-label*="add to cart"], button[aria-label*="add to bag"], button[id*="add-to-cart"], button[class*="add-to-cart"], button[data-test*="add-to-cart"]');
}

// Function to check for other product page indicators
function checkForProductPageIndicators() {
    const productPageIndicators = [
        document.querySelector('.price'),           // Checking for price elements
        document.querySelector('.product-title'),   // Checking for product titles
        document.querySelector('[id*="product"]')   // Checking for product detail container
    ];

    return productPageIndicators.some(indicator => indicator !== null);
}

// Function to determine if the current page is a product page
function isProductPage() {
    return checkUrlForKeywords() && (checkForAddToCartButton() || checkForProductPageIndicators());
}

if (isProductPage()) {
    injectFloatingButton();
}

function injectFloatingButton() {
    console.log('Injecting floating button...');

    const button = document.createElement('div');
    button.id = 'extension-floating-button';  // Namespaced ID

    // Create an img element for the icon
    const iconImg = document.createElement('img');
    iconImg.src = chrome.runtime.getURL('icons/icon.png');  // Path to your icon
    iconImg.alt = 'Budget Buddy Icon';
    iconImg.style.width = '100%';  // Make sure the icon fits the button size
    iconImg.style.height = '100%';

    // Append the icon to the button
    button.appendChild(iconImg);
    button.style.transition = 'right 0.3s ease-in-out';

    document.body.appendChild(button);
    console.log('Button appended to body');

    // Create the panel container but don't display it yet
    const panelContainer = document.createElement('div');
    panelContainer.id = 'extension-panel';  // Namespaced ID
    panelContainer.style.display = 'none'; // Hidden by default
    document.body.appendChild(panelContainer);

    // Attach Shadow DOM to the panel container
    const shadowRoot = panelContainer.attachShadow({ mode: 'open' });
    console.log('Shadow root created:', shadowRoot);

    // Load the CSS into the shadow root
    fetch(chrome.runtime.getURL('content.css'))
        .then(response => response.text())
        .then(cssContent => {
            const style = document.createElement('style');
            style.textContent = `
                :host { all: initial; }
            `;
            style.textContent += cssContent;
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
    exitButton.className = 'extension-exit-button';
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














