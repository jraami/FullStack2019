import React from 'react'
import actionFor from './actionCreators'

const AnecdoteList = ({ store }) => {

    voteHandler = (value) => (event) => {
        console.log('like handler event' + event)
        store.dispatch(actionFor.vote(value))
        store.dispatch(actionFor.sort())
    }

    const anecdotes = store.getState()

    return (

        <div>
            <h2>Anecdotes</h2>
            {anecdotes.anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={this.voteHandler(anecdote.id)}>Vote</button>
                    </div>
                </div>
                })
            </div>


    )
}