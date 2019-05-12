import React from 'react'
import actionFor from './actionCreators'

const AnecdoteForm = ({ store }) => {

    const newAnecdoteHandler = (event) => {
        event.preventDefault()
        console.log('anecdote handler event: ' + event)
        const content = event.target.anecdoteString.value
        console.log('app.js creating new: ' + content)
        store.dispatch(actionFor.anecdoteCreation(content))
        event.target.anecdoteString.value = ''
    }
    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={this.newAnecdoteHandler}>
                <div><input name='anecdoteString' /></div>
                <button type='submit'>Create</button>
            </form>
        </div >
    )
}
export default AnecdoteForm
