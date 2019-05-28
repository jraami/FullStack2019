import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Route, Link, Redirect, withRouter
} from 'react-router-dom'
import { connect } from 'react-redux'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'

import { checkLogin } from './reducers/loginReducer'

import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import UserView from './components/UserView'
import BlogList from './components/BlogList'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'

const App = (props) => {

    // INIT AND CHECK FOR EXISTING TOKEN

    useEffect(() => {
        props.initializeBlogs()
        props.initializeUsers()
        const loggedUserJSON = window.localStorage.getItem('BlogUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            if (!user) return
            props.checkLogin(user)
        }
    }, [])

    return (
        <div>
            <Router>
                <div>
                    <Notification />
                    <LoginForm />

                    <Route exact path="/" render={() =>
                        <BlogList />
                    } />

                    <Route exact path="/" render={() =>
                        <AddBlogForm />
                    } />

                    <Route exact path="/userlist" render={() =>
                        <UserList />
                    } />

                    <Route exact path="/userlist/:id" render={({ match }) =>
                        <UserView id={match.params.id} />
                    } />

                </div>
            </Router>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = {
    initializeBlogs,
    initializeUsers,
    checkLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

