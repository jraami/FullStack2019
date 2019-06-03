import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import CommentForm from './CommentForm'
import Comment from './Comment'

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
                    <button onClick={(event) => handleDelete(blog, event)}>Delete this entry
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

    const listComments = () => {
        //        if (!blog.comments) return null
        if (blog.comments.length >= 0) {
            return (<div>
                {blog.comments.map(comment =>
                    <Comment key={comment.id} comment={comment} />)
                }
            </div>)
        } else {
            return (
                <div>
                    No comments yet.
               </div>
            )
        }
    }

    return (
        <div><h2>{blog.title} by {blog.author}</h2><br />
            <a href={blog.url}>{blog.url}</a><br />
            {blog.likes} likes {likeButton()}<br />
            <i>Added by {username()}.</i><br />
            {deleteButton()}
            <h3>Comments</h3>
            {listComments()}
            Add your comment:
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