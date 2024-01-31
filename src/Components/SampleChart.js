import HighchartsReact from "highcharts-react-official";
import { useState, useEffect } from "react";
import Highcharts from "highcharts";
import axios from "axios";


const SampleChart = () => {

    const [array, setArray] = new useState([]);

    const options = {
        chart: {
            type: 'areaspline'
        },
        title: {
            text: 'My Highcharts Chart',
        },
        accessibility: {
            announceNewData: {
                enabled: true,
                minAnnounceInterval: 15000,
                announcementFormatter: function (
                    allSeries,
                    newSeries,
                    newPoint) {
                    if (newPoint) {
                        return 'New point added. Value: ' + newPoint.y;
                    }
                    return false;
                }
            }
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                second: '%H:%M:%S',
                minute: '%H:%M:%S',
                hour: '%H:%M:%S',
                day: '%H:%M:%S',
                week: '%H:%M:%S',
                month: '%H:%M:%S',
                year: '%H:%M:%S',
            },
        },
        plotOptions: {
            areaspline: {
                color: '#32CD32',
                fillColor: {
                    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                    stops: [
                        [0, '#32CD32'],
                        [1, '#32CD3200']
                    ]
                },
                threshold: null,
                marker: {
                    lineWidth: 1,
                    lineColor: null,
                    fillColor: 'white'
                }
            }
        },
        series: [
            {
                data: array,
            },
        ]
    };

    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                const response = await axios.get('https://demo-live-data.highcharts.com/time-data.csv');
                let temp = [];
                response.data.split("\n").slice(1,).map(item => {
                    let value = [new Date(item.split(",")[0]).getTime(), parseFloat(item.split(",")[1])];
                    return temp.push(value);
                })
                console.log(temp);
                setArray(temp);
            } catch (error) {
                console.log(error);
            }
        }, 2000);
        return () => clearInterval(intervalId)
    });

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default SampleChart;
