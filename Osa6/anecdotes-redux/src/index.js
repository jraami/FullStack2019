import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import anecdoteReducer from './reducers/anecdotereducer'
import filterReducer from './reducers/filterreducer'
import notificationReducer from './reducers/notereducer'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
})

const store = createStore(reducer)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)