import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Register service worker for offline functionality
registerServiceWorker();

const rootElement = document.getElementById('root');

if (!rootElement) {
	throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);