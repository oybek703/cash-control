import React, {useEffect, useState} from 'react'
import {Typography} from '@mui/material'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid'
import axiosInstance from '../../utils/axiosInstance'
import Alert from '@mui/material/Alert'
import {catchError, withToken} from '../../utils'
import SubmitIcon from '../Layout/SubmitIcon'
import {useNavigate} from 'react-router-dom'

const AddIncome = () => {
    const [income, setIncome] = useState(0)
    const [type, setType] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        if (income > 0 && type) {
            try {
                setError('')
                setLoading(true)
                await axiosInstance.post(
                    `/api/add_income`,
                    {amount: income, type},
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
            setIncome(0)
            setType('')
        }
    }, [error])

    return (
        <>

            <Typography align='center' variant='h6'>Add Income</Typography>
            <br/>
            {error && <>
                <Alert onClose={setError.bind(null, '')} severity="error">
                    {error}
                </Alert>
                <br/>
            </>}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                disabled={loading}
                                type='number'
                                value={income}
                                onChange={({target: {value}}) => setIncome(+value)}
                                id="expense-value"
                                size='small' label="Income amount"
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
                                <MenuItem value='salary'>Salary</MenuItem>
                                <MenuItem value='unexpected'>Unexpected</MenuItem>
                                <MenuItem value='work'>Work</MenuItem>
                                <MenuItem value='small_business'>Small business</MenuItem>
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

export default AddIncome