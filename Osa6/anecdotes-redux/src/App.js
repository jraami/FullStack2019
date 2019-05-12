import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = (props) => {
    const store = props.store

    return (
        <div>
            {console.log(props)}
            <AnecdoteList store={props.store} />
            <AnecdoteForm store={props.store} />
        </div>
    )
}
export default App