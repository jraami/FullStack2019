const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        //      id: getId(),
        votes: 0
    }
}

const anecdoteReducer = (state = [], action) => {
    switch (action.type) {

        case 'INIT_ANECDOTES':
            return action.data

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

            return newState

        case 'SORT':
            const sortByVotes = (listToBeSorted) => {
                const sortedList = listToBeSorted.sort((a, b) => {
                    if (a.votes < b.votes) return 1
                    if (a.votes > b.votes) return -1
                    return 0
                })
                return sortedList
            }
            const sortedAnecdotes = sortByVotes(state)
            //                visibleAnecdotes: sortByVotes(state.visibleAnecdotes)

            return sortedAnecdotes

        default:
            return state
    }
}

export const initializeAnecdotes = (anecdotes) => {
    return {
        type: 'INIT_ANECDOTES',
        data: anecdotes
    }
}

export const anecdoteCreation = (content) => {
    console.log(content)
    return {
        type: 'NEW_ANECDOTE',
        data: {
            content
        }
    }
}

export const vote = (id) => {
    return {
        type: 'VOTE',
        data: { id }
    }
}

export const sort = () => {
    return {
        type: 'SORT'
    }
}

export default anecdoteReducer
