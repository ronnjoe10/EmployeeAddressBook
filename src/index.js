import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { Provider } from 'react-redux'
import Store from './config/Store'
import { BrowserRouter } from 'react-router-dom';

const app =
    <Provider store={Store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>

ReactDOM.render(app, document.getElementById('app'));