window.dash_clientside = Object.assign({}, window.dash_clientside, {
    eCharts_textAnim: {
        Chart: function (n_clicks, rawText) {
            console.log("chart triggered. n_clicks:", n_clicks);
            if (!n_clicks) {
                console.log("n_clicks is null or undefined. Exiting function.");
                return null;
            }
            
            var chartDom = document.getElementById('echarts-container-text-anim');
            if (!chartDom) {
                console.log("Chart container not found. Exiting function.");
                return null;
            }

            // Dispose existing chart instance if it exists
            if (echarts.getInstanceByDom(chartDom)) {
                echarts.dispose(chartDom);
            }

            var chart = echarts.init(chartDom);

            var option = {
                graphic: {
                    elements: [
                        {
                            type: 'text',  // Assuming 'rawText' is meant to set the content type, but it should be 'text'
                            left: 'center',
                            top: 'center',
                            style: {
                                text: rawText || 'loading',  // Use rawText for the actual displayed text
                                fontSize: 50,
                                fontWeight: 'bold',
                                lineDash: [0, 200],
                                lineDashOffset: 0,
                                fill: 'transparent',
                                stroke: 'grey',
                                lineWidth: 1
                            },
                            keyframeAnimation: {
                                duration: 3000,
                                // loop: true,
                                keyframes: [
                                    {
                                        percent: 0.7,
                                        style: {
                                            fill: 'transparent',
                                            lineDashOffset: 200,
                                            lineDash: [200, 0]
                                        }
                                    },
                                    {
                                        percent: 0.8,
                                        style: {
                                            fill: 'transparent'
                                        }
                                    },
                                    {
                                        percent: 1,
                                        style: {
                                            fill: 'grey'
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            type: 'line',
                            left: 'center',
                            top: '60%',
                            shape: {
                                x1: -10,
                                y1: 40,
                                x2: 40,
                                y2: 40
                            },
                            style: {
                                stroke: 'grey',
                                lineWidth: 3,
                                opacity: 0 // Start as invisible
                            },
                            keyframeAnimation: {
                                duration: 1000,
                                delay: 3000, // Start after the text animation finishes
                                loop: false,
                                keyframes: [
                                    {
                                        percent: 0,
                                        style: {
                                            opacity: 0
                                        }
                                    },
                                    {
                                        percent: 1,
                                        style: {
                                            opacity: 1
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            };

            console.log("Setting ECharts option:", option);
            chart.setOption(option);
            console.log("ECharts rendering complete.");
        },
    },
});