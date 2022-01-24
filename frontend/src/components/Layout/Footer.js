import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import {makeStyles} from '@mui/styles'

const useStyles = makeStyles(theme => ({
    footer: {
        display: 'flex',
        justifyContent: 'center',
        minHeight: 40,
        alignItems: 'center',
        border: '1px solid #ddd',
        backgroundColor: '#eee',
        color: '#333'
    }
}))

const Footer = () => {
    const classes = useStyles()
    return (
        <Grid component='footer' item className={classes.footer}>
            <Typography variant='body1' align='center'> Cash Control - © 2022</Typography>
        </Grid>
    )
}

export default Footer