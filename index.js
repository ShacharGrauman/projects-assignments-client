import React from 'react';
import ReactDOM from 'react-dom';

import App from './src/components/App';
import AppRouter from './src/routers/Router'

import DataProvider from './src/components/common/Provider/DataProvider'

ReactDOM.render(
<DataProvider>
    <AppRouter />
</DataProvider>

, document.querySelector("#container"));