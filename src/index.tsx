import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';

import App from './App';

const rootElem = document.getElementById('root') as HTMLElement;

if (rootElem) {
    const root = ReactDOM.createRoot(rootElem);

    root.render(
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>,
    );
}