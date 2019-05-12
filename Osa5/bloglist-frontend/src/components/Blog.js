import React from 'react'
import PropTypes from 'prop-types'

class Blog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            deleted: false,
            visible: false,
            blog: props.blog,
            username: props.username
        }
    }

    toggleVisibility = () => {
        this.setState({ visible: !this.state.visible })
    }

    likeAdder = (event) => {
        this.setState({
            blog: {
                ...this.state.blog,
                likes: this.state.blog.likes + 1
            }
        })
        this.props.likeHandler(this.state.blog, event)
    }

    render() {
        const deleteButton = () => {
            if (this.state.username === this.state.blog.userId.username) {
                return (<div><button onClick={(event) => this.props.deleteHandler(this.state.blog, event)}>Delete</button> <br /><br /></div>)
            }
        }

        const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
        const showWhenVisible = { display: this.state.visible ? '' : 'none' }

        const renderBlog = () => {
            if (this.state.deleted === false)
                return (
                    <div className="blog">
                        <div className="title" style={hideWhenVisible}>
                            <div className="titlebar" onClick={this.toggleVisibility} ><b>{this.state.blog.title}</b> by {this.state.blog.author}</div><br />
                        </div>
                        <div className="details" style={showWhenVisible}>
                            <div onClick={this.toggleVisibility} ><b>{this.state.blog.title}</b> by {this.state.blog.author}<br />
                                <a href={this.state.blog.url}>{this.state.blog.url}</a><br />
                                {this.state.blog.likes} likes <button className="likebutton" onClick={(event) => this.likeAdder(event)}>Like</button><br />
                                Added by {this.state.blog.userId.name}<br />
                                {deleteButton()}
                            </div>
                        </div >
                    </div>
                )
            else return (
                <div></div>
            )
        }


        return (
            <div>
                {renderBlog()}
            </div>
        )
    }
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired
}

export default Blog