import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {createStore, combineReducers} from 'redux'
import loginreducer from './redux/Reducers'
// import * as serviceWorker from './serviceWorker';

const reducers =combineReducers({
    loginreducer
})
const store = createStore(reducers)

const render =()=>ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));
render()
store.subscribe(render)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
