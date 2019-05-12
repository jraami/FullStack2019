import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import App from './App'
import Reducer from './components/reducer'

it('renders without crashing', () => {

    const store = createStore(Reducer)
    const div = document.createElement('div')
    ReactDOM.render(<App store={store} />, div)
    ReactDOM.unmountComponentAtNode(div)
})
