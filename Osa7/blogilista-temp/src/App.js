import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Route, Link, Redirect, withRouter
} from 'react-router-dom'
import { connect } from 'react-redux'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { checkLogin } from './reducers/loginReducer'

import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'

import Menu from './components/Menu'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import UserView from './components/UserView'
import BlogList from './components/BlogList'
import BlogView from './components/BlogView'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    notification_none: {
        color: 'black',
        backgroundColor: 'none'
        
    },
    notification_success: {
        color: 'green',
        backgroundColor: '#555555'
    },
    notification_failure: {
        color: 'red',
        backgroundColor: 'blue'
    },
}))

const App = (props) => {
    const classes = useStyles()
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

    const loggedInRender = () => {
        if (props.login.token) {
            return (
                <div>
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

                    <Route exact path="/blogs/:id" render={({ match }) =>
                        <BlogView id={match.params.id} />
                    } />
                </div>
            )
        }
        else {
            return null
        }
    }

    return (
        <Container component="main">
            <CssBaseline />
            <div className={classes.paper}>
                <Router>
                    <Container component="header">
                        <Notification />
                        <Menu classes={classes} />
                    </Container>
                    <Container component="div">
                        <div>
                            <div>
                                <LoginForm />
                                {loggedInRender()}
                            </div>
                        </div>
                    </Container>
                </Router>
            </div>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        login: state.login
    }
}

const mapDispatchToProps = {
    initializeBlogs,
    initializeUsers,
    checkLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

