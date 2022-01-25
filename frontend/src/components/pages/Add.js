import React from 'react'
import Grid from '@mui/material/Grid'
import AddIncome from './AddIncome'
import AddExpense from './AddExpense'

const Add = () => {
    return (
        <>
            <br/><br/>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <AddIncome/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AddExpense/>
                </Grid>
            </Grid>
        </>
    )
}

export default Add