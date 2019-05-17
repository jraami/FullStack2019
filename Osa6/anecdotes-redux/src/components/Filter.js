import React from 'react'
import { connect } from 'react-redux'
import { filterList } from '../reducers/filterreducer'

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

const Filter = (props) => {
    const handleChange = (event) => {
        props.filterList(event.target.value)
    }

    return (
        <div>
            <input name='filter' onChange={handleChange} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        filter: state.filter,
    }
}

const mapDispatchToProps = {
    filterList,
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)