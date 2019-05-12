import React from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import InputField from './components/InputField'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'

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

    submitNew = async (event) => {
        event.preventDefault()
        try {
            const post = await blogService.post({
                title: this.state.title,
                author: this.state.author,
                url: this.state.url
            })
            this.setState({
                title: '',
                author: '',
                url: ''
            })
            if (post) {
                this.setNotification(`Added entry to list.`, 'notification_success')
                this.blogFormRef.current.toggleVisibility()
            }
        } catch (error) {
            //console.log(error.response.data.error)
            console.log(error)
            this.setNotification(`Couldn't add entry: ` + error, 'notification_failure')
        }
        this.refreshList()
    }

    handleFieldChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleNumberChange = (event) => this.setState({ newNumber: event.target.value })

    handleLikeButton = async (blog, event) => {
        console.log('handling like' + blog)
        event.preventDefault()
        try {
            const updatedPost = await blogService.like(blog)

        } catch (exception) {
            console.log(`Like failed`)
        }
        console.log('firing up refresh')
        this.refreshList()
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

    blogFormRef = React.createRef()
    blogRef = React.createRef()

    blogForm = () => (
        <div>
            <Togglable buttonLabel="Add entry" ref={this.blogFormRef}>
                Add a blog to list: <br />
                < form onSubmit={this.submitNew} >
                    <InputField name="title" text="Title: " type="text" value={this.state.title} onChange={this.handleFieldChange} />
                    <InputField name="author" text="Author's name: " type="text" value={this.state.author} onChange={this.handleFieldChange} />
                    <InputField name="url" text="URL: " type="text" value={this.state.url} onChange={this.handleFieldChange} />
                    <button type="submit">Submit</button>
                </form >
                <br />
            </Togglable>
        </div>
    )


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
}

export default App
