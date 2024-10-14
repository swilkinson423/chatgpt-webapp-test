import ReactDOM from 'react-dom/client';
import { SharedStateProvider } from './components/_SharedStateComponent';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import './styles/App.css';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import App from './components/App';
import Footer from './components/Footer';

// RENDER THE DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

	<SharedStateProvider>
		<Navbar />
		<div id="applet-window">
			<div className="container-fluid h-100">
				<div className="row h-100">
					<Sidebar />
					<App />
				</div>
			</div>
		</div>
		<Footer />
	</SharedStateProvider>

);