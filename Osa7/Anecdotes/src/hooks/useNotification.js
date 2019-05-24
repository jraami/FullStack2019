import React, { useState } from 'react'

// HOOKKIA EI VOI KÄYTTÄÄ TÄLLÄ TAVOIN; MAKENOTIFICATION KUTSUTAAN EHDON SISÄLLÄ?

const useNotification = () => {
    const [notification, setNotification] = useState('note')

    const makeNotification = (message) => {
        console.log(message)
        setNotification(message)
        console.log(notification)
        /* setTimeout(() => {
             console.log('notification removed')
             setNotification('')
         }, 10000)*/
    }

    return {
        notification,
        makeNotification
    }
}
export default useNotification