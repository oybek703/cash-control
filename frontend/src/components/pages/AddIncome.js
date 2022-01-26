import React, {useEffect, useState} from 'react'
import axiosInstance from '../../utils/axiosInstance'
import {catchError, withToken} from '../../utils'
import SubmitIcon from '../UI/SubmitIcon'
import {useNavigate} from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Alert from '../UI/Alert'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

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
            {error && <Alert message={error}/>}
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
                                variant='outlined'
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