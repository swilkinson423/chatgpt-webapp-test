import ReactDOM from 'react-dom/client';
import { SharedStateProvider } from './src/components/_SharedStateComponent';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import './styles/App.css';

import Navbar from './src/components/Navbar';
import Sidebar from './src/components/Sidebar';
import App from './src/components/App';
import Footer from './src/components/Footer';

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