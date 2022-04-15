import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './store';
// import { BrowserRouter as Router } from 'react-router-dom';

// ReactDOM.render(
//     <Provider store={ store }>
//       <Router>
//         <App />
//       </Router>
//     </Provider>
// , document.getElementById('root'));
// registerServiceWorker();
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={ store }>
    <App />

</Provider>
        );