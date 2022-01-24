import React from 'react'
import Grid from '@mui/material/Grid'
import {CardContent, Typography} from '@mui/material'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import {Link} from 'react-router-dom'

const NotFound = () => {
    return (
        <Grid container justifyContent='center'>
            <br/>
            <Card variant='outlined'>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Page Not Found!
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Well, we might have removed the page when we redesigned our website.

                        Or the link you clicked might be old and does not work anymore.

                        Or you might have accidentally typed the wrong URL in the address bar.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant='outlined' component={Link} to='/'>Back To Home</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default NotFound