import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axiosInstance from '../../../utils/axiosInstance'
import {catchError, withToken} from '../../../utils'
import SubmitIcon from './SubmitIcon'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Alert from './Alert'

const AddExpense = () => {
    const [expense, setExpense] = useState(0)
    const [type, setType] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        if (expense > 0 && type) {
            try {
                setError('')
                setLoading(true)
                await axiosInstance.post(
                    `/api/add_expense`,
                    {amount: expense, type},
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
            if(error) setError('')
            setExpense(0)
            setType('')
        }
    }, [error])
    return (
        <>
            <Typography align='center' variant='h6'>Add Expense</Typography>
            <br/>
            {error && <Alert message={error}/>}
            <form onSubmit={handleSubmit}>
                <Grid container  spacing={2}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                disabled={loading}
                                required
                                InputProps={{inputProps: {min: 0} }}
                                min={0}
                                type='number'
                                value={expense}
                                onChange={({target: {value}}) => setExpense(+value)}
                                id="expense-value"
                                size='small' label="Expense amount"
                                       variant="outlined"/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth size='small' required disabled={loading}>
                            <InputLabel variant='outlined' id="demo-simple-select-label">Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={type}
                                label="Type"
                                variant='outlined'
                                onChange={({target: {value}}) => setType(value)}
                            >
                                <MenuItem value='unexpected'>Unexpected</MenuItem>
                                <MenuItem value='breakfast'>Breakfast</MenuItem>
                                <MenuItem value='lunch'>Lunch</MenuItem>
                                <MenuItem value='supper'>Supper</MenuItem>
                                <MenuItem value='clothing'>Clothing</MenuItem>
                                <MenuItem value='parents'>Parents</MenuItem>
                                <MenuItem value='debt'>Debt</MenuItem>
                                <MenuItem value='phone'>Phone</MenuItem>
                                <MenuItem value='charity'>Charity</MenuItem>
                                <MenuItem value='service'>Service</MenuItem>
                                <MenuItem value='other'>Other</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <br/>
                <SubmitIcon loading={loading}/>
            </form>
        </>
    )
}

export default AddExpense