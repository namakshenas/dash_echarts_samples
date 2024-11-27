window.dash_clientside = Object.assign({}, window.dash_clientside, {
    eCharts_boxPlot: {
        Chart: function (n_clicks, columns, rawData) {
            console.log("chart triggered. n_clicks:", n_clicks);
            if (!n_clicks) {
                console.log("n_clicks is null or undefined. Exiting function.");
                return null;
            }

            const container = document.getElementById("echarts-container");
            if (!container) {
                console.log("Container with id 'echarts-container' not found.");
                return null;
            }

            console.log("Container found. Initializing or retrieving ECharts instance...");

            // Check if an existing chart instance is attached to the container
            let chart = echarts.getInstanceByDom(container);

            if (!chart) {
                console.log("No existing chart instance found. Creating a new one.");
                chart = echarts.init(container, {
                    renderer: "canvas",
                });
            } else {
                console.log("Existing chart instance found. Reusing it.");
            }

            // from here should be modified

            function prepareBoxplotData(data) {
                const result = [];
                for (let i = 0; i < data[0].length; i++) {
                    const columnData = data.map(row => row[i]);
                    columnData.sort((a, b) => a - b);
                    const Q1 = columnData[Math.floor((columnData.length / 4))];
                    const Q2 = columnData[Math.floor((columnData.length / 2))];
                    const Q3 = columnData[Math.floor((columnData.length * 3) / 4)];
                    const min = columnData[0];
                    const max = columnData[columnData.length - 1];
                    result.push([min, Q1, Q2, Q3, max]);
                }
                return result;
            }

            const preparedData = prepareBoxplotData(rawData);

            const option = {
                tooltip: {
                    trigger: 'axis',
                    confine: true
                },
                grid: {
                    left: '10%',
                    right: '10%',
                    bottom: '15%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    // name: 'Values',
                    splitArea: {
                        show: true
                    }
                },
                yAxis: {
                    type: 'category',
                    data: columns,
                    boundaryGap: true,
                    nameGap: 30,
                    splitArea: {
                        show: false
                    },
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                series: [
                    {
                        name: 'boxplot',
                        type: 'boxplot',
                        data: preparedData,
                        tooltip: {
                            formatter: function (param) {
                                if (param.data && param.data.length > 0) {
                                    return [
                                        'Index: ' + columns[param.dataIndex],
                                        'Lower: ' + param.data[0],
                                        'Q1: ' + param.data[1],
                                        'Median: ' + param.data[2],
                                        'Q3: ' + param.data[3],
                                        'Upper: ' + param.data[4]
                                    ].join('<br/>');
                                }
                                return '';
                            }
                        }
                    }
                ]
            };


            // till here

            console.log("Setting ECharts option:", option);
            chart.setOption(option);
            console.log("ECharts rendering complete.");
        },
    },
});
