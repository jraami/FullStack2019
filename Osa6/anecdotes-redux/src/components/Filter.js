import React from 'react'
import actionFor from '../actionCreators'

export const filterAnecdotes = (filterString, filterList) => {
    if (filterString) {
        const filteredList = filterList.filter(anecdote => {
            const content = anecdote.content.toLowerCase()
            const filter = filterString.toLowerCase()
            return content.includes(filter)
        })
        console.log(filteredList)
        return filteredList
    }
    else {
        return filterList
    }
}

const Filter = ({ store }) => {
    const handleChange = (event) => {
        store.dispatch(actionFor.filterList(event.target.value))
    }

    return (
        <div>
            <input name='filter' onChange={handleChange} />
        </div>
    )
}

export default Filter