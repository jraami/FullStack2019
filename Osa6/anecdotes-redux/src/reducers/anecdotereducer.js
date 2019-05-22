import anecdoteService from '../services/anecdoteService'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        //      id: getId(),
        votes: 0
    }
}

const sortByVotes = (listToBeSorted) => {
    const sortedList = listToBeSorted.sort((a, b) => {
        if (a.votes < b.votes) return 1
        if (a.votes > b.votes) return -1
        return 0
    })
    return sortedList
}

const anecdoteReducer = (state = [], action) => {
    switch (action.type) {

        case 'INIT_ANECDOTES':
            const initializedAnecdotes = sortByVotes(action.data)
            return initializedAnecdotes

        case 'NEW_ANECDOTE':
            const concatenatedList = state.concat(asObject(action.data.content))
            console.log(concatenatedList)
            return concatenatedList

        case 'VOTE':
            const id = action.data.id
            const anecdoteToChange = state.find(n => n.id === id)
            const anecdote = {
                ...anecdoteToChange,
                votes: anecdoteToChange.votes + 1
            }
            const newState = state.map(entry => entry.id !== id ? entry : anecdote)

            return sortByVotes(newState)

        default:
            return state
    }
}

// Action creators

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes
        })
    }
}

export const anecdoteCreation = content => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch({
            type: 'NEW_ANECDOTE',
            data: {
                content
            }
        })
    }
}

export const vote = id => {
    return async dispatch => {
        const votedAnecdote = await anecdoteService.vote(id)
        dispatch({
            type: 'VOTE',
            data: { id }
        })
    }
}

export default anecdoteReducer
