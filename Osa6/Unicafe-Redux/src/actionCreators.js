export default {
    /*
    anecdoteCreation(content) {
        return {
            type: 'NEW_NOTE',
            data: {
                content,
                important: false,
                id: generateId()
            }
        }
    },
    */
    vote(value) {
        switch (value) {
            case (1):
                return { type: 'GOOD' }
        },
        case(0): return {
        type: 'NEUTRAL'
    }
        case
}