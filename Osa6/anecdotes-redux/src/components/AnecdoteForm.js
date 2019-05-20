import React from 'react'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdoteService'
import { anecdoteCreation } from '../reducers/anecdotereducer'
import { makeNotification } from './Notification'

const AnecdoteForm = (props) => {

    const newAnecdoteHandler = async (event) => {
        event.preventDefault()
        const content = event.target.anecdoteInput.value
        console.log(content)
        event.target.anecdoteInput.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        console.log(newAnecdote)
        props.anecdoteCreation(newAnecdote)
        makeNotification('Anecdote created', 'notification_success')

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
const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = {
    anecdoteCreation,
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)