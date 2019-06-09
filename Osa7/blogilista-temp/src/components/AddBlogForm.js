import React from 'react'
import { connect } from 'react-redux'

import { createBlog } from '../reducers/blogReducer'
import { makeNotification } from './Notification'

import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const AddBlogForm = (props) => {

    const submitNew = async (event) => {
        event.preventDefault()
        try {
            const inputField = event.target
            const post = await props.createBlog({
                title: event.target.title.value,
                author: event.target.author.value,
                url: event.target.url.value
            })
            inputField.title.value = ''
            inputField.author.value = ''
            inputField.url.value = ''
            makeNotification('Blog created', 'notification_success')
        } catch (error) {
            makeNotification(error.message, 'notification_failure')
        }
    }

    return (
        <div>
            <Typography variant='h2' gutterBottom>
                Add a blog
            </Typography>
            <form onSubmit={submitNew} >
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="author"
                    label="Author"
                    name="author"
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="url"
                    label="Url"
                    name="url"
                />
                <Button variant='contained' type="submit">Submit</Button>
            </form >
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
    }
}
const mapDispatchToProps = {
    createBlog,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBlogForm)
