import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { setNotification, resetNotification } from '../reducers/notificationReducer'

var componentProps = ''

const NotificationBadge = styled.div`
    position: absolute;
    color: black;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    `
const NotificationFailure = styled(NotificationBadge)`
    color: mediumvioletred;
    background-color: pink;
    border: 1px solid mediumvioletred;
    border-radius: 3px;
    `
const NotificationSuccess = styled(NotificationBadge)`
    color: green;
    background-color: palegreen;
    border: 1px solid green;
    border-radius: 3px;
    `

export const makeNotification = (message, displayStyle) => {
    componentProps.setNotification(message, displayStyle)
    setTimeout(() => {
        componentProps.resetNotification()
    }, 5000)
}

const Notification = (props) => {
    componentProps = props
    const displayNotification = () => {
        switch (props.notification.displayStyle) {
        case 'notification_success':
            return (
                <NotificationSuccess>
                    {props.notification.message}
                </NotificationSuccess>
            )
        case 'notification_failure':
            return (
                <NotificationFailure>
                    {props.notification.message}
                </NotificationFailure>
            )
        }
    }
    return (
        <div>
            {displayNotification()}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

const mapDispatchToProps = {
    setNotification,
    resetNotification
}

const ConnectedNotification = connect(mapStateToProps, mapDispatchToProps)(Notification)
export default ConnectedNotification