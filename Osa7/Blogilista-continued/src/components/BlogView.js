import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import CommentForm from './CommentForm'

import { deleteBlog } from '../reducers/blogReducer'
import { like } from '../reducers/blogReducer'
import { makeNotification } from './Notification'

const BlogView = withRouter((props) => {
    const blog = props.blogs.find(a => a.id === props.id)
    console.log(props)
    console.log(blog)
    if (blog === undefined) { return null }

    const username = () => {
        if (props.login.username === blog.userId.username) {
            return ('you')
        }
        else {
            return (blog.userId.name)
        }
    }

    const handleDelete = async (blogToBeDeleted, event) => {
        event.preventDefault()
        try {
            props.deleteBlog(blogToBeDeleted)
            makeNotification('Blog deleted', 'notification_success')
            props.history.push(`/`)
        } catch (exception) {
            makeNotification('Delete was not successful: ' + exception)
            console.log(exception)
        }
    }

    const handleLike = async (blogToBeLiked, event) => {
        event.preventDefault()
        try {
            console.log(blogToBeLiked)
            props.like(blogToBeLiked)
        } catch (exception) {
            console.log(exception)
        }
    }


    const deleteButton = () => {
        if (props.login.username === blog.userId.username) {
            return (
                <div>
                    <button onClick={(event) => handleDelete(blog, event)}>Delete
                    </button>
                    <br />
                </div>
            )
        }
    }

    const likeButton = () => {
        if (props.login.name) {
            return (
                <button onClick={(event) => handleLike(blog, event)}>Like
                </button>)
        }
    }

    return (
        <div><h2>{blog.title} by {blog.author}</h2><br />
            <a href={blog.url}>{blog.url}</a><br />
            {blog.likes} likes {likeButton()}<br />
            Added by {username()}.<br />
            {deleteButton()}
            <CommentForm id={blog.id} />
        </div>
    )
})

const mapStateToProps = (state) => {
    return {
        login: state.login,
        blogs: state.blogs
    }
}
const mapDispatchToProps = {
    deleteBlog,
    like
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogView)