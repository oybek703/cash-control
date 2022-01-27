import React, {useEffect, useState} from 'react'
import CustomTabs from '../UI/Layout/Tabs'
import LineGraph from '../charts/LineGraph'
import Loader from '../UI/Loader'
import Alert from '../UI/Layout/Alert'
import Grid from '@material-ui/core/Grid'
import axiosInstance from '../../utils/axiosInstance'
import {catchError, getDataArrays, withToken} from '../../utils'
import TimeBarGraph from '../charts/TimeBarGraph'
import HorizontalBar from '../charts/HorizontalBar'

const Home = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [daily, setDaily] = useState({amounts: [], types: [], times: []})
    const [weekly, setWeekly] = useState({amounts: [], types: [], times: []})
    const [monthly, setMonthly] = useState({amounts: [], types: [], times: []})
    useEffect(() => {
        async function fetchData() {
            try {
                setError('')
                setLoading(true)
                const {data: dailyData} = await axiosInstance(
                    `/api/get_expense?report_type=today`,
                    withToken()
                )
                const {data: weeklyData} = await axiosInstance(
                    `/api/get_expense?report_type=weekly`,
                    withToken()
                )
                const {data: monthlyData} = await axiosInstance(
                    `/api/get_expense?report_type=monthly`,
                    withToken()
                )
                setLoading(false)
                setDaily(getDataArrays(dailyData, 'payed_at', true))
                setWeekly(getDataArrays(weeklyData))
                setMonthly(getDataArrays(monthlyData))
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
                    /*Daily Report*/
                    FirstTab={<Grid container>
                            <Grid item xs={12} sm={6}>
                                <LineGraph id='daily' data={daily}/>
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TimeBarGraph id='daily_bar_graph' data={daily} normative={30}/>
                            </Grid>
                            <Grid item xs={12}>
                                    <HorizontalBar id='daily_horizontal_bar'
                                                   series={[400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]}/>
                            </Grid>
                        </Grid>}
                    /*Weekly Report*/
                    SecondTab={
                        <Grid container>
                            <Grid item xs={12} sm={12}>
                                <LineGraph id='weekly' data={weekly} normative={25000}/>
                            </Grid>
                            <Grid item sm={12} xs={12}>
                                <TimeBarGraph id='weekly_bar_graph' data={weekly}/>
                            </Grid>
                        </Grid>
                    }
                    /*Monthly Report*/
                    ThirdTab={
                        <Grid container>
                            <Grid item xs={12} sm={12}>
                                <LineGraph id='monthly' data={monthly} normative={25000}/>
                            </Grid>
                            <Grid item sm={12} xs={12}>
                                <TimeBarGraph id='monthly_bar_graph' data={monthly}/>
                            </Grid>
                        </Grid>
                    }/>
            </>

    )
}

export default Home