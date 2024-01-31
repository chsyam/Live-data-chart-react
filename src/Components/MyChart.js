import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

// export default function MyChart() {
// const createChart = () => {
//     HighchartsReact.chart('container', {
//         chart: {
//             type: 'areaspline'
//         },
//         title: {
//             text: 'Live Data'
//         },
//         accessibility: {
//             announceNewData: {
//                 enabled: true,
//                 minAnnounceInterval: 15000,
//                 announcementFormatter: function (
//                     allSeries,
//                     newSeries,
//                     newPoint) {
//                     if (newPoint) {
//                         return 'New point added. Value: ' + newPoint.y;
//                     }
//                     return false;
//                 }
//             }
//         },
//         plotOptions: {
//             areaspline: {
//                 color: '#32CD32',
//                 fillColor: {
//                     linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
//                     stops: [
//                         [0, '#32CD32'],
//                         [1, '#32CD3200']
//                     ]
//                 },
//                 threshold: null,
//                 marker: {
//                     lineWidth: 1,
//                     lineColor: null,
//                     fillColor: 'white'
//                 }
//             }
//         },
//         data: {
//             csvURL: "https://demo-live-data.highcharts.com/time-data.csv",
//             enablePolling: true,
//             dataRefreshRate: parseInt(1, 10)
//         }
//     });
// }


// createChart();
// return (
//     <div className="container">
//         <Highcharts 
//     </div>
// );
// }
const LiveChartDataComponent = () => {
    const [data, setData] = useState([]);
    const config = {
        chart: {
            type: 'areaspline'
        },
        title: {
            text: 'Live Data'
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
        data: {
            csvURL: "https://demo-live-data.highcharts.com/time-data.csv",
            enablePolling: true,
            dataRefreshRate: parseInt(1, 10)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://demo-live-data.highcharts.com/time-data.csv');
                console.log(response.data.split("\n"));
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    return <HighchartsReact highcharts={Highcharts} options={config} />;
};

export default LiveChartDataComponent;
