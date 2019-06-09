import React from 'react'
import { Link } from 'react-router-dom'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

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

const User = (props) => {
    const classes = useStyles()
    if (props.user === undefined) { return null }

    return (
        <div>
            <Link to={`/userlist/${props.user.id}`} style={{ textDecoration: 'none' }}>
                <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <Typography variant="h5" component="h2">
                            {props.user.name}
                        </Typography>
                        <Typography>
                            {props.user.entries.length} entries
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        </div>
    )
}

export default User