import React from 'react'
import actionFor from '../actionCreators'
import { setNotification } from './Notification'

const AnecdoteForm = ({ store }) => {

    const newAnecdoteHandler = (event) => {
        event.preventDefault()
        const content = event.target.anecdoteInput.value
        store.dispatch(actionFor.anecdoteCreation(content))
        setNotification(store, 'Anecdote created', 'notification_success')
        event.target.anecdoteInput.value = ''
    }

    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={newAnecdoteHandler}>
                <div><input name='anecdoteInput' /></div>
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}
export default AnecdoteForm
