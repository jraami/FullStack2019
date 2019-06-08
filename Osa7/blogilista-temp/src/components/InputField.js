import React from 'react'
import Typography from '@material-ui/core/Typography'

const InputField = ({ text, type, value, onChange, name }) => {
    return (
        <div>
            <Typography variant='body1' gutterBottom>
                {text}
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    name={name} />
            </Typography>
        </div >
    )
}

export default InputField