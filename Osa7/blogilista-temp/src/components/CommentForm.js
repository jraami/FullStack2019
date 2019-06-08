import React from 'react'
import { connect } from 'react-redux'

import { comment } from '../reducers/blogReducer'

import { makeNotification } from './Notification'

import InputField from '../components/InputField'
import Button from '@material-ui/core/Button'

const CommentForm = (props) => {

    const addComment = async (event, id) => {
        event.preventDefault()
        const thisId = props.id
        try {
            const inputField = event.target
            await props.comment({
                thisId,
                comment: event.target.comment.value,
            })
            inputField.comment.value = ''
            makeNotification('Comment added', 'notification_success')
        } catch (error) {
            makeNotification(error.message, 'notification_failure')
            console.log(error)
        }
    }

    return (
        <div>
            <form onSubmit={addComment} >
                <InputField name="comment" text="Add your comment: " type="text" />
                <Button variant='contained' type="submit">Submit</Button>
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
    comment,
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)
