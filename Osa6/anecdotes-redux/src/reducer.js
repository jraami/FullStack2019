const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

const initialState = {
    anecdotes: anecdotesAtStart.map(asObject)
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case 'NEW_ANECDOTE':
            console.log('new', action.data)
            const newAnecdote = asObject(action.data.content)
            console.log(newAnecdote)
            return {
                anecdotes: [...state.anecdotes, newAnecdote]
            }

        case 'VOTE':
            const id = action.data.id
            const anecdoteToChange = state.anecdotes.find(n => n.id === id)
            const anecdote = {
                ...anecdoteToChange,
                votes: anecdoteToChange.votes + 1
            }
            const newState = {
                anecdotes: state.anecdotes.map(entry => entry.id !== id ? entry : anecdote)
            }
            return (newState)

        case 'SORT':
            const sortedState = {
                anecdotes: state.anecdotes.sort((a, b) => {
                    if (a.votes < b.votes) return 1
                    if (a.votes > b.votes) return -1
                    return 0
                })
            }
            return (sortedState)

        default:
            return state
    }
}

export default reducer
