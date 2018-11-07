import React from 'react';
import ReactDOM from 'react-dom';

// O PROVIDER FAZ COM QUE A STORE DO REDUX SEJA DISTRIBUIDA PARA TODO O APP SEM QUE  CONSIGA ACESSAR DO CONSOLE DO NAVEGADOR
import {Provider } from 'react-redux'

// CSS Global
import './assets/css/reset.css'
import './assets/css/container.css'
import './assets/css/btn.css'
import './assets/css/icon.css'
import './assets/css/iconHeart.css'
import './assets/css/notificacao.css'
import store from './store'
import './assets/css/novoTweet.css'

// import './index.css';


// import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {BrowserRouter} from 'react-router-dom'
import Roteamento from './routes.js'


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Roteamento/>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
