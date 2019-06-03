import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
    const padding = {
        paddingRight: 5
    }
    return (
        <div>
            <Link style={padding} to="/">Blogs</Link>
            <Link style={padding} to="/userlist">Users</Link>
        </div>
    )
}

export default Menu