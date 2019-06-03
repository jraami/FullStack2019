import React from 'react'
import { connect } from 'react-redux'

import { createBlog } from '../reducers/blogReducer'

import { makeNotification } from './Notification'

import InputField from '../components/InputField'

const AddBlogForm = (props) => {

    /*
    const newAnecdoteHandler = async (event) => {
        event.preventDefault()
        const content = event.target.anecdoteInput.value
        event.target.anecdoteInput.value = ''
        props.anecdoteCreation(content)
        makeNotification('Anecdote created', 'notification_success'
    }
*/

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
            console.log(error)
        }
    }

    return (
        <div>
            Add a blog to list: <br />
            <form onSubmit={submitNew} >
                <InputField name="title" text="Title: " type="text" />
                <InputField name="author" text="Author's name: " type="text" />
                <InputField name="url" text="URL: " type="text" />
                <button type="submit">Submit</button>
            </form >
            <br />
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
