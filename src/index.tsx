import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';
import store from './redux/Store';

import {Global} from '@emotion/core';
import {globalStyles} from './utils/css.utils';
import './App.css';

const root = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
      <Global styles={globalStyles}/>
      <App />
    </Provider>, root);
