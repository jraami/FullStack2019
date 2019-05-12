export default {

    anecdoteCreation(content) {
        console.log('creating new anecdote: ' + content)
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
    }
}