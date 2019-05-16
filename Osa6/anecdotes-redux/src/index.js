import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App';
import anecdoteReducer from './reducers/anecdotereducer'
import filterReducer from './reducers/filterreducer'
import noteReducer from './reducers/notereducer'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: noteReducer
})

const store = createStore(reducer)

console.log(store.getState())

const render = () => {
    <App store={store} /> ,
        document.getElementById('root')
    )
}

render()
store.subscribe(render)