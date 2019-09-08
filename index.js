import React from 'react';
import ReactDOM from 'react-dom';

import App from './src/components/App';
import AppRouter from './src/routers/Router'

ReactDOM.render(<AppRouter />, document.querySelector("#container"));