import React from 'react'
import AddIncome from '../UI/Layout/AddIncome'
import AddExpense from '../UI/Layout/AddExpense'
import Grid from '@material-ui/core/Grid'

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