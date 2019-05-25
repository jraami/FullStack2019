import loginService from '../services/login'
import blogService from '../services/blogs'

const loginReducer = (state = [], action) => {
    switch (action.type) {

        case 'LOGIN':
            return action.data

        case 'LOGOUT':
            return action.data

        case 'TOKEN':
            return action.data
        default:
            return state
    }
}

// Action creators

/*
    
            this.setNotification('Login successful', 'notification_success')
          
        } catch (error) {
            this.setNotification('Error: ' + error.response.data.error, 'notification_failure')
        }
    }
*/
export const loginAction = (credentials) => {
    return async dispatch => {
        try {
            const user = await loginService.login(credentials)
            dispatch({
                type: 'LOGIN',
                data: user
            })
            blogService.setToken(user.token)
            window.localStorage.setItem('BlogUser', JSON.stringify(user))
        } catch (error) {
            console.log(error)
        }
    }
}

export const logoutAction = () => {
    return async dispatch => {
        const user = await loginService.logout()
        dispatch({
            type: 'LOGOUT'
        })
    }
}

export const checkXXLogin = () => {
    const loggedUserJSON = window.localStorage.getItem('BlogUser')
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        if (!user) {
            return async dispatch => {
                try {
                    const user = await blogService.setToken(user.token)
                    dispatch({
                        type: 'TOKEN',
                        data: user
                    })
                } catch (error) {
                    console.log(error)
                }
            }
        }
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
