import userService from '../services/users'
/*
const sortAlphabetically = (listToBeSorted) => {
    const sortedList = listToBeSorted.sort((a, b) => {
        if (a.likes < b.likes) return 1
        if (a.likes > b.likes) return -1
        return 0
    })
    return sortedList
}
*/

const userReducer = (state = [], action) => {
    switch (action.type) {

        case 'INIT_USERS':
            const initializedUsers = action.data
            return initializedUsers
        /*
                case 'NEW_BLOG':
                    const concatenatedList = state.concat(action.data.newBlog)
                    console.log(concatenatedList)
                    return concatenatedList
        */

        default:
            return state
    }
}

// Action creators

export const initializeUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch({
            type: 'INIT_USERS',
            data: users
        })
    }
}
/*
export const createBlog = content => {
    return async dispatch => {
        let newBlog = await blogService.post(content)
        console.log(content)
        const user = JSON.parse(window.localStorage.getItem('BlogUser'))
        newBlog = {
            ...newBlog,
            userId: {
                _id: newBlog.userId,
                username: user.username,
                name: user.name
            }
        }
        console.log(newBlog)
        dispatch({
            type: 'NEW_BLOG',
            data: {
                newBlog
            }
        })
    }
}
*/

export default userReducer