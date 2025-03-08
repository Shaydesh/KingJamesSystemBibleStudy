import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

// Register service worker for offline functionality
registerServiceWorker();

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)