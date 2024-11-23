window.dash_clientside = Object.assign({}, window.dash_clientside, {
    eCharts_heatMapChart: {
        Chart: function (n_clicks, x_axis, y_axis, data) {
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

            const option = {
                tooltip: {
                    position: "top",
                },
                grid: {
                    height: "40%",
                    top: "10%",
                },
                xAxis: {
                    type: "category",
                    data: x_axis,
                    splitArea: {
                        show: true,
                    },
                },
                yAxis: {
                    type: "category",
                    data: y_axis,
                    splitArea: {
                        show: true,
                    },
                },
                visualMap: {
                    min: 0,
                    max: 10,
                    calculable: true,
                    orient: "horizontal",
                    left: "center",
                    bottom: "15%",
                },
                series: [
                    {
                        name: "Punch Card",
                        type: "heatmap",
                        data: data,
                        label: {
                            show: true,
                        },
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowColor: "rgba(0, 0, 0, 0.5)",
                            },
                        },
                    },
                ],
            };

            console.log("Setting ECharts option:", option);
            chart.setOption(option);
            console.log("ECharts rendering complete.");
        },
    },
});
