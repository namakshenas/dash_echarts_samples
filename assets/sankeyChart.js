window.dash_clientside = Object.assign({}, window.dash_clientside, {
    eCharts: {
        sankeyChart: function (n_clicks, data) {
            console.log("sankeyChart triggered. n_clicks:", n_clicks);
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
                // title: {
                //     text: 'Sankey Diagram'
                // },
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'
                },
                series: [
                    {
                        type: 'sankey',
                        data: data.nodes,
                        links: data.links,
                        emphasis: {
                            focus: 'adjacency'
                        },
                        levels: [
                            {
                                depth: 0,
                                itemStyle: {
                                    color: '#fbb4ae'
                                },
                                lineStyle: {
                                    color: 'source',
                                    opacity: 0.6
                                }
                            },
                            {
                                depth: 1,
                                itemStyle: {
                                    color: '#b3cde3'
                                },
                                lineStyle: {
                                    color: 'source',
                                    opacity: 0.6
                                }
                            },
                            {
                                depth: 2,
                                itemStyle: {
                                    color: '#ccebc5'
                                },
                                lineStyle: {
                                    color: 'source',
                                    opacity: 0.6
                                }
                            },
                            {
                                depth: 3,
                                itemStyle: {
                                    color: '#decbe4'
                                },
                                lineStyle: {
                                    color: 'source',
                                    opacity: 0.6
                                }
                            }
                        ],
                        lineStyle: {
                            curveness: 0.5
                        }
                    }
                ]
            };

            console.log("Setting ECharts option:", option);
            chart.setOption(option);
            console.log("ECharts rendering complete.");
        },
    },
});
