import React, {useEffect, useState} from 'react'
import {CardContent, List, makeStyles} from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Card from '@material-ui/core/Card'
import axiosInstance from '../../utils/axiosInstance'
import {catchError, withToken} from '../../utils'
import Grid from '@material-ui/core/Grid'
import Loader from '../UI/Loader'
import Alert from '../UI/Layout/Alert'

const useStyles = makeStyles(theme => ({
    listItem: {
        backgroundColor: '#ddd',
        marginBottom: 15
    }
}))

const Budget = () => {
    const classes = useStyles()
    const [budget, setBudget] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    useEffect(() => {
        async function fetchBudget() {
            try {
                setError('')
                setLoading(true)
                const {data} = await axiosInstance(
                    `/api/get_budget`,
                    withToken()
                )
                setBudget(data)
                setLoading(false)
            } catch (e) {
                setError(catchError(e))
                setLoading(false)
            }
        }

        fetchBudget()
    }, [])
    return (
        loading ? <Grid container justifyContent='center'><Loader/></Grid>
            : error
            ? <Alert message={error}/>
            : <>
                <h3>Budget Info</h3>
                <Card>
                    <CardContent>
                        <List>
                            {Object.keys(budget).map(key => <ListItem key={key}
                                                                      className={classes.listItem}>
                                <ListItemText primary={`${budget[key]}`} secondary={`${key}`}/>
                            </ListItem>)}
                        </List>
                    </CardContent>
                </Card>
            </>
    )
}

export default Budget