import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import './styles/index.css';

import { SharedStateProvider } from './components/_SharedStateComponent';

import App from './components/App';

// RENDER THE DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

	<SharedStateProvider>
		<App />
	</SharedStateProvider>

);