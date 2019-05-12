import React from 'react'
import Blog from './Blog'

const ListAll = ({ username, blogs, refresher }) => {
    return (
        <div>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} username={username} refresher={refresher} />)
            }
        </div>
    )
}

const BlogList = ({ username, blogs, refresher }) => {
    return (
        <div>
            <h2>Blogs:</h2>
            <ListAll blogs={blogs} username={username} refresher={refresher} />
        </div>
    )
}


export default BlogList