import React from 'react'

const Anecdote = (props) => {

    return (
        <div>
            <div>
                {props.anecdote.content}
            </div>
            <div>
                has {props.anecdote.votes}
                <button onClick={props.handleClick}>Vote</button>
            </div>
        </div>

    )
}


export default Anecdote