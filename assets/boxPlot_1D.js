window.dash_clientside = Object.assign({}, window.dash_clientside, {
    eCharts_boxPlot_1D: {
        Chart: function (n_clicks, rawData) {
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

            // Prepare the boxplot data for the 1D data
            function prepareBoxplotData(data) {
                data.sort((a, b) => a - b);
                const Q1 = data[Math.floor((data.length / 4))];
                const Q2 = data[Math.floor((data.length / 2))];
                const Q3 = data[Math.floor((data.length * 3) / 4)];
                const min = data[0];
                const max = data[data.length - 1];
                const mean = (data.reduce((sum, value) => sum + value, 0) / data.length).toFixed(2);
                return { boxplotData: [[min, Q1, Q2, Q3, max]], mean, min, Q1, Q2, Q3, max }; // Return as an object containing boxplot data and statistics
            }

            const { boxplotData, min, Q1, Q2, Q3, max } = prepareBoxplotData(rawData);

            const option = {
                tooltip: {
                    show: false,
                },
                grid: {
                    left: '0%',
                    right: '0%',
                },
                xAxis: {
                    type: 'value',
                    min: min,
                    max: max,
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        show: false,
                    },
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'category',
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        show: false,
                    },
                    splitLine: {
                        show: false
                    }
                },
                series: [
                    {
                        name: 'boxplot',
                        type: 'boxplot',
                        data: boxplotData,
                        itemStyle: {
                            color: 'rgba(0, 0, 255, 0.2)',
                            borderWidth: 3,
                        },
                    },
                    {
                        name: 'values',
                        type: 'scatter',
                        data: [
                            { value: [min, 0], label: { show: true, position: [0, -50], formatter: '' + min , fontSize: 16, align: 'center', verticalAlign: 'middle' } },
                            { value: [Q1, 0], label: { show: true, position: [0, -50], formatter: '' + Q1 , fontSize: 16, align: 'center', verticalAlign: 'middle' } },
                            { value: [Q2, 0], label: { show: true, position: [0, -50], formatter: '' + Q2 , fontSize: 16, align: 'center', verticalAlign: 'middle' } },
                            { value: [Q3, 0], label: { show: true, position: [0, -50], formatter: '' + Q3 , fontSize: 16, align: 'center', verticalAlign: 'middle' } },
                            { value: [max, 0], label: { show: true, position: [0, -50], formatter: '' + max , fontSize: 16, align: 'center', verticalAlign: 'middle' } },
                        ],
                        symbolSize: 0,
                    }
                ]
            };
            console.log("Setting ECharts option:", option);
            chart.setOption(option);
            console.log("ECharts rendering complete.");
        },
    },
});
