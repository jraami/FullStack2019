import React from 'react'
import { connect } from 'react-redux'
import { setNotification, resetNotification } from '../reducers/notereducer'
// KOKEILE TEHDÄ TÄSTÄ HOOK SEURAAVAKSI:

var componentProps = ''

export const makeNotification = (message, displayStyle) => {
    console.log('hellooo')
    componentProps.setNotification(message, displayStyle)
    setTimeout(() => {
        componentProps.resetNotification()
    }, 5000)
}

const Notification = (props) => {
    componentProps = props
    return (
        <div className={props.notification.displayStyle}>
            {props.notification.message}
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