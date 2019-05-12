import React from 'react'
import actionFor from '../actionCreators'

const AnecdoteForm = ({ store }) => {

    const newAnecdoteHandler = (event) => {
        event.preventDefault()
        console.log(store)
        console.log('anecdote handler event: ' + event)
        const content = event.target.anecdoteInput.value
        console.log('app.js creating new: ' + content)
        store.dispatch(actionFor.anecdoteCreation(content))
        console.log(store.anecdotes)
        event.target.anecdoteInput.value = ''
    }
    return (
        <div>
            {console.log(store)}
            <h2>Create new</h2>
            <form onSubmit={newAnecdoteHandler}>
                <div><input name='anecdoteInput' /></div>
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}
export default AnecdoteForm
