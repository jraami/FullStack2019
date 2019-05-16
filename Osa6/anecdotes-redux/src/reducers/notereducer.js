const initialState = {
    notification: {
        message: '',
        displayStyle: 'notification_none'
    }
}

const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NOTIFICATION':
            console.log(action.data.notification)
            const notification = action.data.notification
            return notification

        default:
            return state
    }
}

export const setNotification = (message, displayStyle) => {
    console.log('setting notification "' + message + '" in style "' + displayStyle)
    return {
        type: 'NOTIFICATION',
        data: {
            notification: {
                message,
                displayStyle
            }
        }
    }
}

export const resetNotification = () => {
    console.log('heiio resetnotification täällä')
    return {
        type: 'NOTIFICATION',
        data: {
            notification: {
                message: '',
                displayStyle: 'notification_none'
            }
        }
    }
}

export default noteReducer

