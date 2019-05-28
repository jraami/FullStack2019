import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const User = (props) => {
    if (props.user === undefined) { return null }

    return (
        <div>
            name: <b><Link to={`/userlist/${props.user.id}`}>{props.user.name}</Link></b><br />
            blogs: <b>{props.user.entries.length}</b>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(User)