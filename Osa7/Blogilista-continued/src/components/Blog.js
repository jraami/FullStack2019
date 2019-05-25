import React, { useState } from 'react'
import { connect } from 'react-redux'
import { deleteBlog } from '../reducers/blogReducer'

const Blog = (props) => {
    const username = () => {
        if (props.login.username == props.blog.userId.username) {
            return ('you')
        }
        else {
            return (props.blog.userId.username)
        }
    }

    const handleDelete = async (blog, event) => {
        event.preventDefault()
        try {
            props.deleteBlog(blog)
        } catch (exception) {
            console.log(exception)
        }
    }


    const deleteButton = () => {
        if (props.login.username === props.blog.userId.username) {
            return (<div><button onClick={(event) => handleDelete(props.blog, event)}>Delete</button> <br /></div>)
        }
    }

    return (
        <div>
            <div><b>{props.blog.title}</b> by {props.blog.author}<br />
                <a href={props.blog.url}>{props.blog.url}</a><br />
                {props.blog.likes} likes <button className="likebutton" onClick={props.handleClick} >Like</button><br />
                Added by {username()}.<br />
                {deleteButton()}<br />
            </div>
        </div>
    )
}
/*

    toggleVisibility = () => {
        this.setState({ visible: !this.state.visible })
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

*/

const mapStateToProps = (state) => {
    return {
        login: state.login,
    }
}
const mapDispatchToProps = {
    deleteBlog,
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)