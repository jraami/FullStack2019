import React from 'react'
import { connect } from 'react-redux'
import Anecdote from './Anecdote'
import Filter, { filterAnecdotes } from './Filter'
import { makeNotification } from './Notification'
import { vote, sort } from '../reducers/anecdotereducer'

const AnecdoteList = (props) => {
    const filteredAnecdotes = filterAnecdotes(props.filter.filterString, props.anecdotes)

    const voteHandler = (value) => (event) => {
        console.log('like handler event' + event)
        props.vote(value)
        props.sort()
        makeNotification('Voted', 'notification_success')
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
            <Filter store={props.store} />
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter,
        notification: state.notification
    }
}

const mapDispatchToProps = {
    vote,
    sort,
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
