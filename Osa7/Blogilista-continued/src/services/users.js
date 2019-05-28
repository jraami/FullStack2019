import axios from 'axios'
const baseUrl = 'http://localhost:3002/api/users'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getOne = async (id) => {
    const response = await axios.get(baseUrl + '/' + id)
    return response.data
}


export default { getAll, getOne, setToken }