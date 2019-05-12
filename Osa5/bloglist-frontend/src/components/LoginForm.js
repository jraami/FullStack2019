import React from 'react';
import InputField from './InputField'

const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => {
    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <InputField text="Username: " name="username" value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <InputField text="Password: " name="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default LoginForm