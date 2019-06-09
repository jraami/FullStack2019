import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

import CommentForm from './CommentForm'
import Comment from './Comment'

import { deleteBlog } from '../reducers/blogReducer'
import { like } from '../reducers/blogReducer'
import { makeNotification } from './Notification'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({

    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1
    }
}))

const BlogView = withRouter((props) => {
    const classes = useStyles()
    const blog = props.blogs.find(a => a.id === props.id)
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
            props.history.push('/')
        } catch (exception) {
            makeNotification('Delete was not successful: ' + exception)
        }
    }

    const handleLike = async (blogToBeLiked, event) => {
        event.preventDefault()
        try {
            props.like(blogToBeLiked)
        } catch (exception) {
            return (exception)
        }
    }


    const deleteButton = () => {
        if (props.login.username === blog.userId.username) {
            return (
                <div>
                    <Button variant='contained' onClick={(event) => handleDelete(blog, event)}>Delete this entry
                    </Button>
                    <br />
                </div>
            )
        }
    }

    const likeButton = () => {
        if (props.login.name) {
            return (
                <Button variant='contained' onClick={(event) => handleLike(blog, event)}>Like
                </Button>)
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
                    <Typography variant='overline'>
                        No comments yet.
                    </Typography>
                </div>
            )
        }
    }

    return (
        <div>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Typography variant="h5" component="h2">
                        {blog.title}
                    </Typography>
                    <Typography variant="overline" gutterBottom>
                        by {blog.author}<br />
                    </Typography>
                    <Typography variant="subtitle" gutterBottom>
                        added by <Link to={`/userlist/${blog.userId._id}`}>{username()}</Link><br />
                        visit at <a href={blog.url} style={{ textDecoration: 'none' }}>{blog.url}</a><br />
                        {blog.likes} likes<br />
                    </Typography>

                    <CardActions>
                        {deleteButton()}
                        {likeButton()}
                    </CardActions>
                </CardContent>
            </Card>
            <br />
            <Typography variant='h6' gutterBottom>
                Comments
            </Typography>
            {listComments()}
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