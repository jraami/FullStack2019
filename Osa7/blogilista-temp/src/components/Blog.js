import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({

    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flexGrow: 1
    }
}))

const Blog = (props) => {
    const classes = useStyles()
    if (props.blog === undefined) { return null }

    const username = () => {
        if (props.login.username === props.blog.userId.username) {
            return ('you')
        }
        else {
            return (props.blog.userId.name)
        }
    }

    return (
        <div>
            <Link to={`/blogs/${props.blog.id}`} style={{ textDecoration: 'none' }}>
                <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <Typography variant="h5" component="h2">
                            {props.blog.title}
                        </Typography>
                        <Typography variant="overline" gutterBottom>
                            by {props.blog.author}<br/><br/>
                        </Typography>
                        <Typography>
                            {props.blog.likes} likes, {props.blog.comments.length} comments
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
    }
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)