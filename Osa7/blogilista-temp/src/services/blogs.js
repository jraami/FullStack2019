import axios from 'axios'
const baseUrl = 'http://localhost:3002/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const post = async (newObject) => {
    const config = {
        headers: { 'Authorization': token }
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const comment = async (id, comment) => {
    console.log(comment)
    const config = {
        'comment': comment
    }
    const response = await axios.put(baseUrl + '/' + id + '/comments', config)
    return response.data
}

const like = async (id) => {
    const config = {
        headers: { 'Authorization': token }
    }
    const response = await axios.put(baseUrl + '/' + id, config)
    return response.data
}

const remove = async (object) => {
    const config = {
        headers: { 'Authorization': token }
    }
    const response = await axios.delete(baseUrl + '/' + object.id, config)
    return response.data
}

export default { getAll, post, like, remove, comment, setToken }