import React from 'react'
import { connect } from 'react-redux'
import { loginAction, logoutAction } from '../reducers/loginReducer'
import InputField from './InputField'

const LoginForm = (props) => {
    // TÄSTÄ ALEMMASTA ASYNC TRY JOS TOIMII
    const loginHandler = async (event) => {
        event.preventDefault()
        const inputField = event.target
        const credentials = {
            username: event.target.username.value,
            password: event.target.password.value
        }
        inputField.username.value = ''
        inputField.password.value = ''
        props.loginAction(credentials)
        //makeNotification('Anecdote created', 'notification_success')
    }
    /*
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
    */
    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={loginHandler}>
                <div>
                    <InputField text="Username: " name="username" />
                </div>
                <div>
                    <InputField text="Password: " name="password" />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
    }
}
const mapDispatchToProps = {
    loginAction,
    logoutAction
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)