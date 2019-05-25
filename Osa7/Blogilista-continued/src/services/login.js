import axios from 'axios'
const baseUrl = 'http://localhost:3002/api'

const login = async (credentials) => {
    console.log('logging in from login.js')
    const response = await axios.post(baseUrl + "/login", credentials)
    return response.data
}
const logout = async () => {
    console.log('logging out from login.js')
    await axios.post(baseUrl + "/logout", {})
}

export default { login, logout }
