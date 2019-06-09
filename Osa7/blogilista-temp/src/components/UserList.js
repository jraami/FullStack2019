import React from 'react'
import { connect } from 'react-redux'
import User from './User'

import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

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
}))
    
const UserList = (props) => {
    const classes = useStyles()
    return (

        <div>
            <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Typography variant="h3">
                        Users
                    </Typography>
                </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {props.users.map(user =>
                        <Grid item key={user} xs={12} sm={6} md={4}>
                            <User key={user.id} user={user} />
                        </Grid>
                    )}
                </Grid>
            </Container>
        </div>

    )
}


const mapStateToProps = (state) => {
    return {
        users: state.users,
    }
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)