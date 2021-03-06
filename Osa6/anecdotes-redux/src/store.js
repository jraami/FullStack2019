import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import anecdoteReducer from './reducers/anecdotereducer'
import filterReducer from './reducers/filterreducer'
import notificationReducer from './reducers/notereducer'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
})

const store = createStore(reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)
export default store