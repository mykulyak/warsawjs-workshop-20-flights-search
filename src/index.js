import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';
import store from './store';
import App from './components/App';
import './index.css';

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
);
registerServiceWorker();
