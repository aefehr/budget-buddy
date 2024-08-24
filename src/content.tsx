import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './popup';
import './content.css'

// Check if the page is a product page (this is a basic check; you can refine this)
const productPageIndicators = [
    document.querySelector('button[aria-label*="add to bag"]'),  // Checking for Add to Bag button
    document.querySelector('.price'),  // Checking for price elements
    document.querySelector('.product-title'),  // Checking for product titles
    document.querySelector('[id*="product"]')   // Checking for product detail container
];

const isProductPage = productPageIndicators.some(indicator => indicator !== null);

if (isProductPage) {
    // Inject the button into the page
    injectFloatingButton();
}

function injectFloatingButton() {
    // Create the button element
    const button = document.createElement('div');
    button.id = 'floating-button';
    button.innerText = '$';  // Dollar sign or any icon

    // Append the button to the body
    document.body.appendChild(button);

    // Create the expanded panel (initially hidden)
    const panel = document.createElement('div');
    panel.id = 'panel';

    // Create a root element for React to render into
    const root = document.createElement('div');
    root.id = 'budget-patrol-root';
    panel.appendChild(root);

    // Add an exit button to close the panel
    const exitButton = document.createElement('div');
    exitButton.innerHTML = '×';
    exitButton.classList.add('exit-button');
    panel.appendChild(exitButton);

    // Event listener to close the panel
    exitButton.addEventListener('click', () => {
        panel.style.display = 'none';
    });

    // Append the panel to the body
    document.body.appendChild(panel);

    // Add event listener to the button to toggle the panel
    button.addEventListener('click', () => {
        if (panel.style.display === 'none') {
            panel.style.display = 'block';
        } else {
            panel.style.display = 'none';
        }
    });

    // Render the React app into the panel
    ReactDOM.render(<Popup />, root);
}

