import React, {useEffect} from 'react'
import ApexCharts from 'apexcharts'
import theme from '../UI/theme'

function renderOptions(amounts, types, times, id) {
    const options = {
        series: [{name: "Amount", data: amounts}],
        chart: {
            height: 350,
            type: 'bar',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
            },
            toolbar: {
                show: false
            }
        },
        colors: [
            'rgb(121,121,121)',
            theme.palette.warning['light']
        ],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: times,
            labels: {
                rotate: -45,
                rotateAlways: true
            }
        }
    }

    const chart = new ApexCharts(document.querySelector(`#${id}`), options)
    chart.render()
}

const TimeBarGraph = ({id = '', data = {amounts: [], types: [], times: []}}) => {
    useEffect(() => {
        if(data.amounts && data.amounts.length) {
            document.querySelector(`#${id}`).innerHTML=''
            renderOptions(data.amounts, data.types, data.times, id)
        }
    }, [data.amounts, data.types, data.times, id])
    return (
        <div id={`${id}`} className="apex-charts"/>
    )
}

export default TimeBarGraph