import React, {useEffect, useState} from 'react'
import {Typography} from '@mui/material'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid'
import {useNavigate} from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import {catchError, withToken} from '../../utils'
import Alert from '@mui/material/Alert'
import SubmitIcon from '../Layout/SubmitIcon'

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
            {error && <>
                <Alert onClose={setError.bind(null, '')} severity="error">
                    {error}
                </Alert>
                <br/>
            </>}
            <form onSubmit={handleSubmit}>
                <Grid container  spacing={2}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                disabled={loading}
                                required
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
                                label="Age"
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