import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import '@/index.css'
import App from '@/App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

import store from "@/app/store.js";
import { Provider } from 'react-redux';
import ErrorBoundary from '@/components/common/ErrorBoundary.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ErrorBoundary>
			<Provider store={store}>
				<App />
			</Provider>
		</ErrorBoundary>
	</StrictMode>
);