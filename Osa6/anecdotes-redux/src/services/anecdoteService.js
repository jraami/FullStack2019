import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(url)
    console.log(response)
    return response.data
}
const createNew = async (content) => {
    console.log(content)
    const newAnecdote = {
        content,
        votes: 0
    }
    const response = await axios.post(url, newAnecdote)
    console.log(response.data)
    return response.data.content
}

export default { getAll, createNew }
