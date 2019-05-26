import React from 'react'
import { connect } from 'react-redux'
import { loginAction, logoutAction } from '../reducers/loginReducer'
import { makeNotification } from './Notification'

import InputField from './InputField'

const LoginForm = (props) => {
    // TÄSTÄ ALEMMASTA ASYNC TRY JOS TOIMII
    const loginHandler = async (event) => {
        try {
            event.preventDefault()
            const inputField = event.target
            const credentials = {
                username: event.target.username.value,
                password: event.target.password.value
            }
            inputField.username.value = ''
            inputField.password.value = ''
            const response = await props.loginAction(credentials)
            if (response === 401) {
                makeNotification('Wrong username or password', 'notification_failure')
            } else {
                makeNotification('Logged in', 'notification_success')
            }
        }
        catch (error) {
            makeNotification(error.message, 'notification_failure')
        }
    }

    const logoutHandler = async (event) => {
        event.preventDefault()
        try {
            await props.logoutAction()
            makeNotification('Logged out', 'notification_success')
        }
        catch (error) {
            makeNotification(error.message, 'notification_failure')
        }
    }
    const loginForm = () => (
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
    const logoutForm = () => (
        <div>
            <p>
                {props.login.name} logged in.<br />
                <button name="logout" onClick={logoutHandler}>Log out</button>
            </p>
        </div>

    )

    return (
        props.login.name ? logoutForm() : loginForm()
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