export default {

    anecdoteCreation(content) {
        return {
            type: 'NEW_ANECDOTE',
            data: {
                content
            }
        }
    },

    vote(id) {
        return {
            type: 'VOTE',
            data: { id }
        }
    },

    sort() {
        return {
            type: 'SORT'
        }
    },

    setNotification(message, displayStyle) {
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
    },

    resetNotification() {
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
    },

    filterList(filterString) {
        return {
            type: 'FILTER',
            data: {
                filterString
            }
        }
    },

    updateFilteredList() {
        return {
            type: 'UPDATEFILTER'
        }
    }
}