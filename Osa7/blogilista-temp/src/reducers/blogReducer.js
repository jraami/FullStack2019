import blogService from '../services/blogs'

const sortByLikes = (listToBeSorted) => {
    const sortedList = listToBeSorted.sort((a, b) => {
        if (a.likes < b.likes) return 1
        if (a.likes > b.likes) return -1
        return 0
    })
    return sortedList
}

const blogReducer = (state = [], action) => {
    switch (action.type) {

        case 'INIT_BLOGS':
            const initializedBlogs = sortByLikes(action.data)
            return initializedBlogs

        case 'NEW_BLOG':
            const concatenatedList = state.concat(action.data.newBlog)
            console.log(concatenatedList)
            return concatenatedList

        case 'COMMENT':
            const blogToComment = state.find(n => n.id === action.data.commentId)
            blogToComment.comments.push(action.data.commentContent)
            return state.map(entry => entry.id === action.data.commentId ? blogToComment : entry)

        case 'LIKE':
            const likeId = action.data.likeId
            const blogToChange = state.find(n => n.id === likeId)
            const blog = {
                ...blogToChange,
                likes: blogToChange.likes + 1
            }
            const newState = state.map(entry => entry.id !== likeId ? entry : blog)
            return sortByLikes(newState)

        case 'DELETE':
            const deleteId = action.data.id
            return state.filter(entry => entry.id !== deleteId)

        default:
            return state
    }
}

// Action creators

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

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

export const comment = blogComment => {
    const commentId = blogComment.thisId
    const commentContent = blogComment.comment
    console.log(blogComment)
    return async dispatch => {
        await blogService.comment(commentId, commentContent)
        dispatch({
            type: 'COMMENT',
            data: {
                commentId,
                commentContent
            }
        })
    }
}

export const like = blogToLike => {
    return async dispatch => {
        const likeId = blogToLike.id
        await blogService.like(likeId)
        dispatch({
            type: 'LIKE',
            data: { likeId }
        })
    }
}

export const deleteBlog = blogToDelete => {
    return async dispatch => {
        await blogService.remove(blogToDelete)
        dispatch({
            type: 'DELETE',
            data: { id: blogToDelete.id }
        })
    }
}



export default blogReducer
