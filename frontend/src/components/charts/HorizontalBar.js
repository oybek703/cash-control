import React, {useEffect} from 'react'
import ApexCharts from 'apexcharts'
import {CardContent} from '@material-ui/core'
import Card from '@material-ui/core/Card'

async function renderOptions(data = {}, id) {
    const categories = Object.keys(data)
    const series = Object.values(data)
    const total = series.reduce((acc, val) => acc+=val, 0)
    const options = {
        series: [{
            name: 'Amount',
            data: series
        }],
        title: {
            text: `TOTAL: ${total}`,
            align: 'right'
        },
        chart: {
            type: 'bar',
            height: 350,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 0,
                horizontal: true,
            }
        },
        dataLabels: {
            enabled: true
        },
        xaxis: {
            categories,
        }
    }

    const chart = new ApexCharts(document.querySelector(`#${id}`), options)
    chart.render()
}

const HorizontalBar = ({data = {}, id}) => {
    useEffect(() => {
        if (Object.keys(data).length) {
            document.querySelector(`#${id}`).innerHTML = ''
            renderOptions(data, id)
        }
    }, [data, id])
    return (
        <Card>
            <CardContent>
                <div id={`${id}`}/>
            </CardContent>
        </Card>
    )
}

export default HorizontalBar