import React, {useEffect} from 'react'
import ApexCharts from 'apexcharts'
import theme from '../UI/theme'

function renderOptions(series, categories, id, normative = 100) {
    const options = {
        series: [
            {
                name: "Норматив",
                data: new Array(categories.length).fill(normative)
            },
            {
                name: "Факт",
                data: series.map(v => +v.toFixed(2))
            }
        ],
        chart: {
            height: 350,
            type: 'line',
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
            theme.palette.success['light']
        ],
        dataLabels: {
            enabled: true,
            offsetX: -5,
            offsetY: -10
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
            categories: categories,
            labels: {
                rotate: -45,
                rotateAlways: true
            }
        }
    }

    const chart = new ApexCharts(document.querySelector(`#${id}`), options)
    chart.render()
}

const LineGraph = ({id = '', data = {values: {}}, normative = 100}) => {
    useEffect(() => {
        if(data.values && data.values.length) {
            document.querySelector(`#${id}`).innerHTML=''
            renderOptions(data.values, data.categories, id, normative)
        }
    }, [data.values, data.categories, id, normative])
    return (
        <div id={`${id}`} className="apex-charts"/>
    )
}

export default LineGraph