import React from 'react'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

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