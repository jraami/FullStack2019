import axios from 'axios'
const baseUrl = 'http://localhost:3002/api'

const login = async (credentials) => {
    console.log('logging in from login.js')
    try {
        const response = await axios.post(baseUrl + "/login", credentials)
        console.log(response)
        return response.data
    }
    catch (error) {
        console.log(error)
        return error
    }
}
const logout = async () => {
    console.log('logging out from login.js')
    await axios.post(baseUrl + "/logout", {})
}

export default { login, logout }
