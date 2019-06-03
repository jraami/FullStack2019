import React from 'react'
import { connect } from 'react-redux'
import User from './User'

const UserList = (props) => {
    console.log(props.users)
    return (
        <div>
            <h2>Users</h2>
            {props.users.map(user =>
                <User key={user.id} user={user} />)
            }
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        users: state.users,
    }
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)