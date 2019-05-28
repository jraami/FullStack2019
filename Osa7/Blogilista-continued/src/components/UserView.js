import React from 'react'
import { connect } from 'react-redux'

import Blog from './Blog'

const UserView = (props) => {

    const userById = (id) =>
        props.users.find(a => a.id === id)

    const user = props.users.find(a => a.id === props.id)
    if (user === undefined) { return null }
    console.log(user)
    return (
        <div>
            <h2>{user.name}</h2>
            username: <b>{user.username}</b>
            <br />
            <h3>Blogs</h3>
            {user.entries.map(blog =>
                <li key={blog._id}>
                    <b>{blog.title}</b>
                    <br />
                </li>)
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(UserView)