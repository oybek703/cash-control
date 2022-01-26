import React, {useEffect, useState} from 'react'
import axiosInstance from '../../utils/axiosInstance'
import {catchError, getFromLocalStorage, saveToLocalStorage} from '../../utils'
import SubmitIcon from '../UI/Layout/SubmitIcon'
import Container from '@material-ui/core/Container'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent'
import Alert from '../UI/Layout/Alert'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import FormHelperText from '@material-ui/core/FormHelperText'
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    container: {
        background: '#e8e8e8',
        minHeight: '100vh',
        minWidth: '100vw'
    },
    body: {
        minHeight: '30vh',
        minWidth: '80vw',
        padding: 20
    }
}))

const Login = () => {
    const classes = useStyles()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const {token} = getFromLocalStorage('user')
    async function handleSubmit(e) {
        e.preventDefault()
        if (username && password) {
            try {
                setError('')
                setLoading(true)
                const {data} = await axiosInstance.post(`/api/login`, {username, password})
                setLoading(false)
                setError('')
                saveToLocalStorage('user', data)
                window.location.href = '/'
            } catch (e) {
                setError(catchError(e))
                setLoading(false)
            }
        }
    }
    useEffect(() => {
        return function () {
            if(error) setError('')
        }
    }, [token, error])
    return (
        <Container className={classes.container}>
            <Toolbar/>
            <Toolbar/>
            <Typography variant='h5' align='center'>LOGIN</Typography>
            <br/>
            <form onSubmit={handleSubmit}>
                <Grid container justifyContent='center'>
                    <Grid item component={Card} className={classes.body}>
                        <CardContent>
                            {error && <Alert message={error}/>}
                            <FormControl fullWidth>
                                <TextField
                                    required
                                    disabled={loading}
                                    value={username}
                                    onChange={({target: {value}}) => setUsername(value)}
                                    id="username"
                                    size='small' label="Username"
                                    variant="outlined"/>
                            </FormControl>
                            <br/><br/>
                            <FormControl fullWidth>
                                <TextField
                                    required
                                    disabled={loading}
                                    type='password'
                                    value={password}
                                    id={password}
                                    onChange={({target: {value}}) => setPassword(value)}
                                    size='small' label="Password"
                                    variant="outlined"/>
                            </FormControl>
                            <br/><br/>
                            <FormHelperText>Please, pay attention that all fields are case sensetive.</FormHelperText>
                            <br/>
                            <SubmitIcon loading={loading}/>
                        </CardContent>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

export default Login