import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Blog = (props) => {

    if (props.blog === undefined) { return null }

    const username = () => {
        if (props.login.username === props.blog.userId.username) {
            return ('you')
        }
        else {
            return (props.blog.userId.name)
        }
    }

    return (
        <div>
            <b><Link to={`/blogs/${props.blog.id}`}>{props.blog.title}</Link></b><br />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
    }
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)