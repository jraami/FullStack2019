import React from 'react'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

import Blog from './Blog'
import { like } from '../reducers/blogReducer'

const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
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
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}))

const BlogList = (props) => {
    const classes = useStyles()
    const likeHandler = (value) => (event) => {
        props.like(value)
    }

    return (
        <div>  
            <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Typography variant="h1">
                    Blogs
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    This is a list - the best list in the world.
                    </Typography>
                </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {props.blogs.map(blog =>
                        <Grid item key={blog} xs={12} sm={6} md={4}>
                            <Blog key={blog.id} blog={blog} handleClick={likeHandler(blog.id)} />
                        </Grid>
                    )}
                </Grid>
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
    }
}
const mapDispatchToProps = {
    like,
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogList)