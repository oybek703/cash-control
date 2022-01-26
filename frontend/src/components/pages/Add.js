import React from 'react'
import AddIncome from './AddIncome'
import AddExpense from './AddExpense'
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