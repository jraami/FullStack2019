import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import anecdoteService from './services/anecdoteService'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { initializeAnecdotes } from './reducers/anecdotereducer'

const App = (props) => {
    useEffect(() => {
        anecdoteService.getAll()
            .then(anecdotes => props.initializeAnecdotes(anecdotes))
    }, [])

    return (
        <div>
            <Notification />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    )
}

export default connect(null, { initializeAnecdotes })(App)