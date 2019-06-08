import React from 'react'
import { connect } from 'react-redux'
import { loginAction, logoutAction } from '../reducers/loginReducer'
import { makeNotification } from './Notification'

import InputField from './InputField'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

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
            <form onSubmit={loginHandler}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <Button variant="outlined" type="submit">Submit</Button>
            </form>
        </div>
    )
    const logoutForm = () => (
        <div>
        </div >

    )

    return (
        props.login.name ? null : loginForm()
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