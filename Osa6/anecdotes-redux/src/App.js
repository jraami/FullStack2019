import React from 'react'
import actionFor from './actionCreators'

class App extends React.Component {
    voteHandler = (value) => (event) => {
        console.log('like handler event' + event)
        this.props.store.dispatch(actionFor.vote(value))
        this.props.store.dispatch(actionFor.sort())
    }
    newAnecdoteHandler = (event) => {
        event.preventDefault()
        console.log('anecdote handler event: ' + event)
        const content = event.target.anecdoteString.value
        console.log('app.js creating new: ' + content)
        this.props.store.dispatch(actionFor.anecdoteCreation(content))
        event.target.anecdoteString.value = ''

    }

    render() {
        const anecdotes = this.props.store.getState()
        console.log(anecdotes)
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
                )}
                <h2>Create new</h2>
                <form onSubmit={this.newAnecdoteHandler}>
                    <div><input name='anecdoteString' /></div>
                    <button type='submit'>Create</button>
                </form>
            </div>
        )
    }
}

export default App