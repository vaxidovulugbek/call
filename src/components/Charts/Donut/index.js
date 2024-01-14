import React, { useEffect, useMemo, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types'
import { uniqueId } from 'lodash';

import "./styles.scss"
import { helpers } from 'services';

const Donut = ({ categories, values }) => {
    const [active, setActive] = useState(0)
    const [series, setSeries] = useState(false)
    const id = useMemo(() => uniqueId(), [])

    const state = {

        series: [25, 75],
        options: {
            chart: {
                type: 'donut',
                events: {
                }
            },
            dataLabels: {
                enabled: false,
            },
            tooltip: {
                enabled: false
            },
            colors: ['#0077FF', '#F1F8FF'],

            xaxis: {
                labels: {
                    show: false
                }
            },
            legend: {
                show: false
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },


    };

    useEffect(() => {
        const arr = [values[active], 100 - values[active]]
        setSeries(arr)
    }, [active])

    function animateNumber(i) {
        const element = document.getElementById(`number-${id}`)
        const start = Number(element.innerHTML)
        helpers.animateValue(element, start, values[i], 300)
    }



    return (
        <div className="donut-chart">
            <div className="categories">
                {categories.map((category, i) => {
                    return (
                        <p key={i} className={`category ${active === i && 'active'}`} onClick={() => { setActive(i); animateNumber(i) }}>
                            <span></span>
                            {category} - {values[i]}%
                        </p>
                    )
                })}
            </div>
            <div className="chart-wrapper">
                <ReactApexChart options={state.options} series={series || state.series} type="donut" width={300} height={300} />
                <div className="center">
                    <h2><span id={`number-${id}`}>{values[active]}</span> <span className='percant'>%</span> </h2>
                    <p>{categories[active]}</p>
                </div>
            </div>
        </div>
    )
}

Donut.propTypes = {
    categories: PropTypes.array.isRequired,
    values: PropTypes.array.isRequired
}

export default Donut