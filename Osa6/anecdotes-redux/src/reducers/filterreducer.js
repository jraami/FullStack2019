const initialState = {
    filterString: ''
}

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTER':
            return { filterString: action.data.filterString }
        default:
            return state
    }
}

export const filterList = (filterString) => {
    return {
        type: 'FILTER',
        data: {
            filterString
        }
    }
}

export default filterReducer