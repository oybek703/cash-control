import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import {catchError, withToken} from '../../utils'
import SubmitIcon from '../UI/Layout/SubmitIcon'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Alert from '../UI/Layout/Alert'
import FormLabel from '@material-ui/core/FormLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Card from '@material-ui/core/Card'
import {CardContent} from '@material-ui/core'

const Add = () => {
    const [operation, setOperation] = useState('expense')
    const [amount, setAmount] = useState(0)
    const [type, setType] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        if (amount >= 5000 && type) {
            try {
                setError('')
                setLoading(true)
                await axiosInstance.post(
                    `/api/add_${operation}`,
                    {amount, type},
                    withToken()
                )
                setLoading(false)
                navigate('/')
            } catch (e) {
                setError(catchError(e))
                setLoading(false)
            }
        }
    }

    useEffect(() => {
        return function () {
            if (error) setError('')
            setAmount(0)
            setType('')
        }
    }, [error])
    return (
        <div>
            <br/>
            <Typography align='center' variant='h6'>ADD {operation.toUpperCase()}</Typography>
            <br/>
            <Card variant='outlined' component='form' onSubmit={handleSubmit}>
                <CardContent>
                    {error && <Alert message={error}/>}
                    <Grid justifyContent='center' container>
                        <Grid item xs={12}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Income or Expense</FormLabel>
                                <RadioGroup row aria-label="operation" name="operation1" value={operation}
                                            onChange={({target: {value}}) => setOperation(value)}>
                                    <FormControlLabel
                                        value="expense" control={<Radio/>} label="Expense"/>
                                    <FormControlLabel
                                        value="income" control={<Radio/>} label="Income"/>
                                </RadioGroup>
                            </FormControl>
                            <br/>
                            <br/>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent='center'>
                                <FormControl fullWidth>
                                    <TextField
                                        disabled={loading}
                                        required
                                        InputProps={{
                                            inputProps: {min: 5000}
                                        }}
                                        type='number'
                                        value={amount}
                                        onChange={({target: {value}}) => setAmount(+value)}
                                        id="expense-value"
                                        size='small' label="Amount"
                                        variant="outlined"/>
                                </FormControl>
                            </Grid>
                            <br/>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent='center'>
                                <FormControl fullWidth size='small' required disabled={loading}>
                                    <TextField
                                        disabled={loading}
                                        required
                                        InputProps={{
                                            inputProps: {list: 'types'}
                                        }}
                                        value={type}
                                        onChange={({target: {value}}) => setType(value)}
                                        size='small' label="Type"
                                        variant="outlined"/>
                                    {
                                        operation === 'expense'
                                            ? <datalist id='types'>
                                                <option>Unexpected</option>
                                                <option>Breakfast</option>
                                                <option>Lunch</option>
                                                <option>Supper</option>
                                                <option>Clothing</option>
                                                <option>Parents</option>
                                                <option>Debt</option>
                                                <option>Phone</option>
                                                <option>Charity</option>
                                                <option>Service</option>
                                                <option>Other</option>
                                            </datalist>
                                            : <datalist id='types'>
                                                <option>Salary</option>
                                                <option>Unexpected</option>
                                                <option>Work</option>
                                                <option>Small business</option>
                                                <option>Other</option>
                                            </datalist>
                                    }
                                </FormControl>
                            </Grid>
                            <br/>
                        </Grid>
                    </Grid>
                    <SubmitIcon loading={loading}/>
                </CardContent>
            </Card>
        </div>
    )
}

export default Add