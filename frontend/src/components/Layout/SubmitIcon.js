import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'

const SubmitIcon = ({loading}) => {
    return (
        <>
            <Button
                disabled={loading}
                endIcon={loading && <CircularProgress size='20px'/>}
                variant='outlined'
                type='submit'>
                Submit
            </Button>
        </>
    )
}

export default SubmitIcon