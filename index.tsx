import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { polyfill } from "mobile-drag-drop";
import { scrollBehaviourDragImageTranslateOverride } from "mobile-drag-drop/scroll-behaviour";

// Initialize Drag and Drop Polyfill for mobile devices (Tablets/Phones)
// This is crucial for classroom use on iPads/Android tablets
polyfill({
    dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride
});

// Fix for iOS to prevent scrolling while dragging
document.addEventListener("dragenter", (event) => {
  event.preventDefault();
}, { passive: false });

document.addEventListener("touchmove", (event) => {
  // Logic to allow scrolling only if not dragging a card could go here,
  // but generally preventing default on dragover is enough.
}, { passive: false });


const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);