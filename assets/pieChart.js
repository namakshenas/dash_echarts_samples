window.dash_clientside = Object.assign({}, window.dash_clientside, {
    eCharts_pieChart: {
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

            const option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: 'center',  // Align vertically centered
                    left: 'left',   // Align to the left
                    orient: 'vertical'  // Set orientation to vertical
                },
                series: [
                    {
                        name: 'Scale Form',
                        type: 'pie',
                        radius: ['40%', '80%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 5,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: true,
                            // position: 'center'
                        },
                        // emphasis: {
                        //     label: {
                        //         show: true,
                        //         fontSize: 40,
                        //         fontWeight: 'bold'
                        //     }
                        // },
                        // labelLine: {
                        //     show: false
                        // },
                        data: rawData
                    }
                ]
            };
            console.log("Setting ECharts option:", option);
            chart.setOption(option);
            console.log("ECharts rendering complete.");
        },
    },
});
