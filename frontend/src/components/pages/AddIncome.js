import React, {useState} from 'react'
import {Typography} from '@mui/material'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid'

const AddIncome = () => {
    const [expense, setIncome] = useState(0)
    const [type, setType] = useState('')
    function handleSubmit(e) {
        e.preventDefault()
        if(expense > 0 && type) {
            console.log(expense, type)
        }
    }
    return (
        <>
            <br/>
            <Typography variant='h6'>Add Income</Typography>
            <br/>
            <form onSubmit={handleSubmit}>
                <Grid container  spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                type='number'
                                value={expense}
                                onChange={({target: {value}}) => setIncome(+value)}
                                id="expense-value"
                                size='small' label="Income amount"
                                       variant="outlined"/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth size='small' required>
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
                <Button type='submit' variant='outlined'>Submit</Button>
            </form>
        </>
    )
}

export default AddIncome