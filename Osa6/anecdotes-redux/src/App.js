import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = (props) => {
    const store = props.store

    return (
        <div className='anecdotes'>
            <Notification store={props.store} />
            <AnecdoteList store={props.store} />
            <AnecdoteForm store={props.store} />
        </div>
    )
}
export default App