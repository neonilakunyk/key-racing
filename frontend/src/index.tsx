import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Provider as SocketProvider, socket } from './socket';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from 'store';
import { App } from 'components/app';
import './assets/css/styles.scss';

render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <SocketProvider value={socket}>
          <App />
        </SocketProvider>
      </Router>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);
