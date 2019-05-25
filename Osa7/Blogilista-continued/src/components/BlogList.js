import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import { like } from '../reducers/blogReducer'

const BlogList = (props) => {

    const likeHandler = (value) => (event) => {
        console.log(value)
        props.like(value)

        // LIKE TARVII AUTENTIKAATION SERVERIN PUOLELTA:...
        //    makeNotification('Voted', 'notification_success')
    }

    return (
        <div>
            <h2>Blogs:</h2>
            {props.blogs.map(blog =>
                <Blog key={blog.id} blog={blog} handleClick={likeHandler(blog.id)} />)
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
    }
}
const mapDispatchToProps = {
    like,
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogList)