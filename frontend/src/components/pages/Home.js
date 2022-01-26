import React, {useEffect, useState} from 'react'
import CustomTabs from '../UI/Layout/Tabs'
import LineGraph from '../charts/LineGraph'
import Loader from '../UI/Loader'
import Alert from '../UI/Layout/Alert'
import Grid from '@material-ui/core/Grid'
import axiosInstance from '../../utils/axiosInstance'
import {catchError, getDataArrays, withToken} from '../../utils'
import TimeBarGraph from '../charts/TimeBarGraph'

const Home = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [daily, setDaily] = useState({amounts: [], types: [], times: []})
    const weeklyData = {values: [10, 41, 35, 51, 49, 62, 69, 91, 148]}
    const monthlyData = {values: [10, 41, 35, 51, 49, 62, 69, 91, 148]}
    useEffect(() => {
        async function fetchData() {
            try {
                setError('')
                setLoading(true)
                const {data: dailyData} = await axiosInstance(`/api/get_daily_expense`, withToken())
                setLoading(false)
                setDaily(getDataArrays(dailyData, 'payed_at', true))
            } catch (e) {
                setError(catchError(e))
                setLoading(false)
            }
        }

        fetchData()
    }, [])
    return (
        loading
            ? <Grid container justifyContent='center'><Loader/></Grid>
            : error
            ? <Alert message={error}/>
            : <>
                <h3>Income and Expense Report</h3>
                <CustomTabs
                    FirstTab={
                        <Grid container>
                            <Grid item xs={12} sm={6}>
                                <LineGraph id='daily' data={daily} normative={30}/>
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TimeBarGraph id='daily1s' data={daily} normative={30}/>
                            </Grid>
                        </Grid>
                    }
                    SecondTab={<LineGraph id='weekly' data={weeklyData} normative={150}/>}
                    ThirdTab={<LineGraph id='monthly' data={monthlyData} normative={1000000}/>}/>
            </>

    )
}

export default Home