import React, { useState } from 'react'
import {
    BrowserRouter as Router,
    Route, Link, Redirect, withRouter
} from 'react-router-dom'

import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import Menu from './components/Menu'
import CreateNew from './components/CreateNew'
import Footer from './components/Footer'
import About from './components/About'

const App = () => {
    const [anecdotes, setAnecdotes] = useState([
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: '1'
        },
        {
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            info: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: '2'
        }
    ])
    const [notification, setNotification] = useState('')

    const makeNotification = (message) => {
        console.log(message)
        setNotification(message)
        console.log(notification)
        setTimeout(() => {
            console.log('notification removed')
            setNotification('')
        }, 10000)
    }

    const addNew = (anecdote) => {
        anecdote.id = (Math.random() * 10000).toFixed(0)
        setAnecdotes(anecdotes.concat(anecdote))
    }

    const anecdoteById = (id) =>
        anecdotes.find(a => a.id === id)

    const vote = (id) => {
        const anecdote = anecdoteById(id)

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1
        }

        setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
    }

    const padding = {
        paddingRight: 5
    }

    return (
        <div>
            <Router>
                <div>
                    <h1>Software anecdotes</h1>
                    <Notification message={notification} />
                    <Menu />

                    <Route exact path="/anecdotes" render={() =>
                        <AnecdoteList anecdotes={anecdotes} />
                    } />
                    <Route exact path="/anecdotes/:id" render={({ match }) =>
                        <Anecdote anecdote={anecdoteById(match.params.id)} />
                    } />
                    <Route path="/about" render={() =>
                        <About />
                    } />
                    <Route path="/create" render={() =>
                        <CreateNew addNew={addNew} makeNotification={makeNotification} />
                    } />
                    <Footer />
                </div>
            </Router>
        </div>
    )
}

export default App