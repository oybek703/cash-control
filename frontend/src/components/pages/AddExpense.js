import React, {useState} from 'react'
import {Typography} from '@mui/material'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid'

const AddExpense = () => {
    const [expense, setExpense] = useState(0)
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
            <Typography variant='h6'>Add Expense</Typography>
            <br/>
            <form onSubmit={handleSubmit}>
                <Grid container  spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                type='number'
                                value={expense}
                                onChange={({target: {value}}) => setExpense(+value)}
                                id="expense-value"
                                size='small' label="Expense amount"
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
                                <MenuItem value='unexpected'>Unexpected</MenuItem>
                                <MenuItem value='breakfast'>Breakfast</MenuItem>
                                <MenuItem value='lunch'>Lunch</MenuItem>
                                <MenuItem value='supper'>Supper</MenuItem>
                                <MenuItem value='clothing'>Clothing</MenuItem>
                                <MenuItem value='parents'>Parents</MenuItem>
                                <MenuItem value='debt'>Debt</MenuItem>
                                <MenuItem value='phone'>Phone</MenuItem>
                                <MenuItem value='charity'>Charity</MenuItem>
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

export default AddExpense