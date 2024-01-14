import React from 'react'
import ReactApexChart from 'react-apexcharts';

import './styles.scss'

const ApexBarChart = ({ data, regions }) => {

    const labels = data
    const max = Math.max(...data)
    const state = {
        series: [{
            name: 'Inflation',
            data: data.map((curr) => {
                if (curr === 0) {
                    return curr + max * 0.01
                }
                return curr
            })
        }],
        options: {
            plotOptions: {
                bar: {
                    borderRadius: 6,
                    columnWidth: 60,
                    barHeight: '100%'
                }
            },
            fill: {
                colors: ["#0077FF"]
            },
            chart: {
                height: 350,
                type: 'bar',
                toolbar: {
                    show: false
                },
                events: {
                    mounted: addHoverEffect,
                    updated: addHoverEffect,
                }
            },
            dataLabels: {
                enabled: false,
            },
            grid: {
                show: false
            },
            xaxis: {
                categories: regions,
                position: 'top',
                labels: {
                    show: false
                },
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                crosshairs: {
                    fill: {
                        type: 'gradient',
                        gradient: {
                            colorFrom: '#D8E3F0',
                            colorTo: '#BED1E6',
                            stops: [0, 100],
                            opacityFrom: 0.4,
                            opacityTo: 0.5,
                        }
                    }
                },
                tooltip: {
                    enabled: false,
                },

            },
            yaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false,
                },
                labels: {
                    show: false,
                    formatter: function (val) {
                        return val + "%";
                    }
                }

            },
            tooltip: {
                custom: (ref) => {
                    return customTooltip(ref, labels)
                }
            },
        }
    }

    return (
        <div className='barchart'>
            <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
        </div>
    )
}


export default ApexBarChart;



const addHoverEffect = () => {
    const chart_wrapper = document.getElementsByClassName("barchart")[0]
    const paths = Object.values(chart_wrapper.getElementsByTagName('path'))
    const tooltip = chart_wrapper.getElementsByClassName('barchart-tooltip')[0]
    if (paths) {
        paths.forEach((path) => {
            path.addEventListener("mouseenter", (e) => {
                path.style.filter = "drop-shadow(0px 8px 14px rgba(0, 119, 255, 0.25))"
                if (tooltip) {
                    tooltip.style.top = path.getBoundingClientRect().top + 'px'
                }
                paths.forEach((item) => {
                    if (item !== e.target) {
                        item.style.fill = "rgba(0, 119, 255, 0.1)"
                        item.setAttribute('barHeight', 100)
                    }
                })
            })
            path.addEventListener("mouseout", (e) => {
                path.style.filter = ""
                paths.forEach((item) => {
                    item.style.fill = "#0077FF"
                })
            })
        })
    }
}

const customTooltip = ({ series, seriesIndex, dataPointIndex, w }, labels) => {
    window.series = { series, seriesIndex, dataPointIndex, w }

    return `<div id="barchart-tooltip" className="barchart-tooltip"> <div>` +
        '<h4>' + labels[dataPointIndex] + '</h4>' +
        '<p>' + w.globals.labels[dataPointIndex] + '</p> </div>' +
        '<span></span>' +
        '</div>'
}