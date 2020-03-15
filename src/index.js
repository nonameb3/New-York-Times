import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { FetchApiStart } from './reducer/new-york-time/nyt-action';
import store from './reducer/store';

store.dispatch(FetchApiStart());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
