import React from 'react'
import Anecdote from './Anecdote'
import actionFor from '../actionCreators'
import Filter, { filterAnecdotes } from './Filter'
import { setNotification } from './Notification'

const AnecdoteList = ({ store }) => {
    const filteredAnecdotes = filterAnecdotes(store.getState().filter.filterString, store.getState().anecdotes)

    const voteHandler = (value) => (event) => {
        console.log('like handler event' + event)
        store.dispatch(actionFor.vote(value))
        store.dispatch(actionFor.sort())
        setNotification(store, 'Voted', 'notification_success')
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            <ul>
                {console.log(filteredAnecdotes)}
                {filteredAnecdotes.map((anecdote) =>
                    <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={voteHandler(anecdote.id)} />
                )}
            </ul>
            <h3>Filter</h3>
            <Filter store={store} />
        </div>
    )
}

export default AnecdoteList
