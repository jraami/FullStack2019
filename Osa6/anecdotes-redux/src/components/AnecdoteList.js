import React from 'react'
import Anecdote from './Anecdote'
import actionFor from '../actionCreators'

const AnecdoteList = ({ store }) => {

    const storeNow = store.getState()

    const voteHandler = (value) => (event) => {
        console.log('like handler event' + event)
        store.dispatch(actionFor.vote(value))
        store.dispatch(actionFor.sort())
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            <ul>
                {storeNow.anecdotes.map((anecdote) =>
                    <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={voteHandler(anecdote.id)} />
                )}
            </ul>
        </div>
    )
}

export default AnecdoteList
