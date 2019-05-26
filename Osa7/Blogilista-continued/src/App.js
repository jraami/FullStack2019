import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { initializeBlogs } from './reducers/blogReducer'
import { checkLogin } from './reducers/loginReducer'

import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'

const App = (props) => {

    // INIT AND CHECK FOR EXISTING TOKEN

    useEffect(() => {
        props.initializeBlogs()
        const loggedUserJSON = window.localStorage.getItem('BlogUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            if (!user) return
            props.checkLogin(user)
        }
    }, [])

    return (
        <div>
            <Notification />
            <LoginForm />
            <BlogList />
            <AddBlogForm />
        </div>
    )
}

const mapDispatchToProps = {
    initializeBlogs,
    checkLogin
}

export default connect(null, mapDispatchToProps)(App)

