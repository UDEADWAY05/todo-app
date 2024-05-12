import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { HashRouter } from 'react-router-dom';
import 'font-awesome/css/font-awesome.css';
import { store } from './ducks/store';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
  </HashRouter>
);
