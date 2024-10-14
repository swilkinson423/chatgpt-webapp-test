import ReactDOM from 'react-dom/client';
import { SharedStateProvider } from './components/_SharedStateComponent';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import './styles/App.css';

import Navbar from './components/Navbar';
import App from './components/App';
import Footer from './components/Footer';

// RENDER THE DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

	<SharedStateProvider>
		<Navbar />
		<App />
		<Footer />
	</SharedStateProvider>

);