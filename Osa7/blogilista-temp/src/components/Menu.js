import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutAction } from '../reducers/loginReducer'
import { makeNotification } from './Notification'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'

const Menu = (props) => {

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

    const loginInfo = () => {
        if (props.login.name) {
            return (
                <div>
                    {props.login.name} <a onClick={logoutHandler}>
                        <i className="material-icons">exit_to_app</i>
                    </a>
                </div>
            )
        } else return (
            <div>
            </div>
        )
    }

    const MenuItem = ({ text, link, url }) => {
        if (link !== 'true') {
            return (
                <ListItemText inset>
                    <Typography color='inherit' variant='overline'>
                        {text}
                    </Typography>
                </ListItemText>
            )
        }
        else return (
            <ListItemText inset>
                <Typography color='inherit' variant='overline'>
                    <Link to={url}>{text}</Link>
                </Typography>
            </ListItemText>
        )
    }

    return (
        <div>
            <AppBar color='primary' position='absolute' className={props.classes.appBar}>

                <List component='nav'>

                    <ListItem component='div'>
                        <MenuItem text='Blog List App' link='false' />
                        <MenuItem text='Blogs' link='true' url='/' />
                        <MenuItem text='Users' link='true' url='/userlist' />
                        <MenuItem text={loginInfo()} link='false' />
                    </ListItem >

                </List>
            </AppBar>
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
    }
}
const mapDispatchToProps = {
    logoutAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)