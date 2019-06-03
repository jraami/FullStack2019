import loginService from '../services/login'
import blogService from '../services/blogs'

const loginReducer = (state = [], action) => {
    switch (action.type) {

        case 'LOGIN':
            return action.data

        case 'LOGOUT':
            return []

        case 'TOKEN':
            return action.data
        default:
            return state
    }
}

// Action creators

export const loginAction = (credentials) => {
    return async dispatch => {
        const user = await loginService.login(credentials)
        dispatch({
            type: 'LOGIN',
            data: user
        })
        if (user.response) {
            return (user.response.status)
        }
        else {
            blogService.setToken(user.token)
            window.localStorage.setItem('BlogUser', JSON.stringify(user))
        }
    }
}

export const logoutAction = () => {
    return async dispatch => {
        const user = await loginService.logout()
        dispatch({
            type: 'LOGOUT'
        })
        blogService.setToken(null)
        localStorage.setItem("BlogUser", null)
    }
}

export const checkLogin = (userJSON) => {
    return async dispatch => {
        try {
            const user = await blogService.setToken(userJSON.token)
            dispatch({
                type: 'TOKEN',
                data: userJSON
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export default loginReducer
