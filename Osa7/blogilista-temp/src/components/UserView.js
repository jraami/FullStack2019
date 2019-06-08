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
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1
    }
}))

const UserView = (props) => {
    const classes = useStyles()

    const user = props.users.find(a => a.id === props.id)
    if (user === undefined) { return null }
    console.log(user)
    return (
        <div>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Typography variant="h5" component="h2">
                        {user.name}
                    </Typography>
                    <Typography variant="overline" gutterBottom>
                        Username {user.username}
                    </Typography>
                    <Typography variant="h6">
                        Blogs
                    </Typography>
                    <Typography variant="subtitle" gutterBottom>
                        {user.entries.map(blog =>
                            <li key={blog._id}>
                                <Link to={`/blogs/${blog._id}`}>
                                    <b>{blog.title}</b>
                                </Link>
                                <br />
                            </li>)}
                    </Typography>
                </CardContent>
            </Card>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(UserView)