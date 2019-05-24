import React from 'react'

const Anecdote = ({ anecdote }) => (
    <div>
        <h2>{anecdote.content}</h2>
        <div>{anecdote.author}</div>
        <div>{anecdote.info}</div>
    </div>
)

export default Anecdote