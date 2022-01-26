import React from 'react'
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'

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