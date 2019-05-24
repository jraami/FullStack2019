import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

const CreateNew = withRouter((props) => {
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [info, setInfo] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content,
            author,
            info,
            votes: 0
        })
        props.makeNotification('anecdote added')
        setContent('')
        setAuthor('')
        setInfo('')
        props.history.push(`/anecdotes`)
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div>
                    author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div>
                    url for more info
          <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
                </div>
                <button>create</button>
            </form>

        </div>
    )
})
export default CreateNew