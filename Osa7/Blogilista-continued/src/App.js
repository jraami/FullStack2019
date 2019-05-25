import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import InputField from './components/InputField'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
//import blogService from './services/blogs'

import { initializeBlogs } from './reducers/blogReducer'
import { loginAction, checkLogin } from './reducers/loginReducer'
import BlogList from './components/BlogList'
import AddBlogForm from './components/AddBlogForm'

/*
class App extends React.Component {
    constructor(props) {
        super(props)

        this.refreshList = this.refreshList.bind(this)
        this.state = {
            blogs: [],
            user: null,
            username: "",
            password: "",
            title: '',
            author: '',
            url: '',
            error: {
                message: "",
                className: ""
            },
            loggedIn: false
        }
    }

    refreshList() {
        console.log('refreshing list')
        blogService.getAll().then(blogs => {
            console.log('sorting')
            blogs.sort((a, b) => {
                if (a.likes < b.likes) return 1
                if (a.likes > b.likes) return -1
                return 0
            })
            this.setState({ blogs })
        })
    }
    componentDidMount() {
        console.log('didmount funct')
        this.refreshList()
        const loggedUserJSON = window.localStorage.getItem('BlogUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            if (!user) return
            this.setState({ user })
            blogService.setToken(user.token)
        }
    }

    setNotification(message, errorClass) {
        this.setState({
            error: {
                message: message,
                className: errorClass
            }
        })
        setTimeout(() => {
            this.setState({
                error: {
                    message: null,
                    className: null
                }
            })
        }, 5000)
    }

    login = async (event) => {
        console.log("login funct")
        event.preventDefault()
        try {
            const user = await loginService.login({
                username: this.state.username,
                password: this.state.password,
            })
            this.setState({
                username: '',
                password: '',
                user,
                loggedIn: true,
            })
            this.setNotification('Login successful', 'notification_success')
            blogService.setToken(user.token)
            window.localStorage.setItem('BlogUser', JSON.stringify(user))
        } catch (error) {
            this.setNotification('Error: ' + error.response.data.error, 'notification_failure')
        }
    }

    logout = async (event) => {
        console.log("logout funct")
        event.preventDefault()
        this.setState({
            user: null,
            loggedIn: false
        })
        try {
            await loginService.logout()
            localStorage.setItem("BlogUser", null)
        }
        catch (exception) {
            console.log(exception)
        }
    }

    handleDeleteButton = async (blog, event) => {
        event.preventDefault()
        try {
            await blogService.remove(blog)
        } catch (exception) {
            console.log(exception)
        }
        this.refreshList()
    }


    render() {

        const logoutForm = () => (
            <div>
                {this.state.user.name} logged in.
                    <button onClick={this.logout}>Logout</button>
                <div className="bloglist">
                    {blogList()}
                </div>
            </div>
        )

        const loginForm = () => (
            <div className="loginForm">
                <LoginForm username={this.state.username} password={this.state.password} handleUsernameChange={this.handleFieldChange} handlePasswordChange={this.handleFieldChange} handleSubmit={this.login} />
            </div>
        )

        const blogList = () => (
            <div>
                <h2>Blogs:</h2>
                {this.state.blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} username={this.state.user.username} likeHandler={this.handleLikeButton} deleteHandler={this.handleDeleteButton} />)
                }
            </div>
        )
        return (
            <div className="container">
                {this.state.user === null ?
                    loginForm() :
                    logoutForm()
                }
                {this.state.user !== null ? (
                    <div>
                        <Notification message={this.state.error.message} className={this.state.error.className} />
                        {this.blogForm()}

                    </div >
                ) : (<div>Login to enter new blog entries</div>)}
            </div>
        )
    }
}*/


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

    /*    {
        props.user === null ?
            loginForm() :
            logoutForm()
        }*/

    return (
        <div>
            <LoginForm />
            <BlogList />
            <AddBlogForm />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        login: state.login
    }
}
const mapDispatchToProps = {
    initializeBlogs,
    loginAction,
    checkLogin
}

export default connect(null, mapDispatchToProps)(App)

