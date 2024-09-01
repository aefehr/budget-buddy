import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './content.css';

function checkUrlForKeywords() {
    const urlKeywords = ['product', 'listing', 'shop', 'item', 'detail', 'buy', 'purchase'];
    return urlKeywords.some(keyword => window.location.href.toLowerCase().includes(keyword));
}

function checkForAddToCartButton() {
    const buttonSelectors = [
        'button[aria-label*="add to cart"]',
        'button[aria-label*="add to bag"]',
        'button[id*="add-to-cart"]',
        'button[class*="add-to-cart"]',
        'button[data-test*="add-to-cart"]',
        'button[title*="add to cart"]',
        'button[type="submit"][name*="add"]', // Generic add-to-cart buttons
        'button[class*="buy"]',
        'button[data-test*="buy"]',
        'button[class*="purchase"]'
    ];
    return buttonSelectors.some(selector => document.querySelector(selector) !== null);
}

function checkForProductPageIndicators() {
    const productPageIndicators = [
        document.querySelector('.price'),           // Checking for price elements
        document.querySelector('.product-title'),   // Checking for product titles
        document.querySelector('[id*="product"]'),  // Checking for product detail container
        document.querySelector('[class*="product-details"]'), // Common class names for product details
        document.querySelector('meta[property="og:type"][content="product"]'), // Open Graph metadata for products
        document.querySelector('link[rel="canonical"][href*="product"]'), // Canonical links with product in the URL
        document.querySelector('[class*="product-title"]'), // Class names with "product-title"
        document.querySelector('[id*="productTitle"]'), // IDs containing "productTitle"
        document.querySelector('[data-test*="product-title"]'), // Data-test attributes with "product-title"
        document.querySelector('[data-module-type="ProductDetailTitle"]') // Module type for product details
    ];

    return productPageIndicators.some(indicator => indicator !== null);
}

function isProductPage() {
    return checkUrlForKeywords() || checkForAddToCartButton() || checkForProductPageIndicators();
}

if (isProductPage()) {
    injectFloatingButton(); 
}

function injectFloatingButton() {
    console.log('Injecting floating button...');

    const button = document.createElement('div');
    button.id = 'extension-floating-button';  

    const iconImg = document.createElement('img');
    iconImg.src = chrome.runtime.getURL('icons/icon.png');
    iconImg.alt = 'Budget Buddy Icon';
    iconImg.style.width = '100%';  
    iconImg.style.height = '100%';

    button.appendChild(iconImg);
    button.style.transition = 'right 0.3s ease-in-out';

    document.body.appendChild(button);
    console.log('Button appended to body');

    const panelContainer = document.createElement('div');
    panelContainer.id = 'extension-panel';  
    panelContainer.style.display = 'none'; 
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
        button.style.right = '0px';  
        panelContainer.style.display = 'none';
        console.log('Panel closed');
    });
}














