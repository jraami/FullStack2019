import React from 'react';
import actionFor from '../actionCreators'

export const setNotification = (store, message, displayStyle) => {
    console.log(store)
    store.dispatch(actionFor.setNotification(message, displayStyle))
    setTimeout(() => {
        store.dispatch(actionFor.resetNotification())
    }, 5000)
}


const Notification = ({ store }) => {
    const notification = store.getState().notification

    return (
        <div className={notification.displayStyle}>
            {notification.message}
        </div>
    )
}

export default Notification
