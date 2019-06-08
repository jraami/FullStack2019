import React from 'react'
import Typography from '@material-ui/core/Typography'

const Comment = ({ comment }) => {

    return (
        <div>
            <Typography variant='overline'>
                {comment}
            </Typography>
        </div>
    )
}


export default (Comment)