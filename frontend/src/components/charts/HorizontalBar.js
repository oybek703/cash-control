import React, {useEffect} from 'react'
import ApexCharts from 'apexcharts'
import {CardContent} from '@material-ui/core'
import Card from '@material-ui/core/Card'

async function renderOptions(series = []) {
    const options = {
        series: [{
            name: 'Amount',
            data: series
        }],
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
            }
        },
        dataLabels: {
            enabled: true
        },
        xaxis: {
            categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
                'United States', 'China', 'Germany'
            ],
        }
    }

    const chart = new ApexCharts(document.querySelector('#curr_post_chart'), options)
    chart.render()
}

const HorizontalBar = ({series = []}) => {
    useEffect(() => {
        if (series.length) {
            document.querySelector('#curr_post_chart').innerHTML = ''
            renderOptions(series)
        }
    }, [series])
    return (
        <Card>
            <CardContent>
                <div id='curr_post_chart'/>
            </CardContent>
        </Card>
    )
}

export default HorizontalBar