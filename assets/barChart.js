window.dash_clientside = Object.assign({}, window.dash_clientside, {
  eCharts_barChart: {
    Chart: function (n_clicks) {
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

      const option = {
        title: {
          text: 'Horizontal Bar Chart with Rounded Corners',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            textStyle: {
              fontSize: 16, // Increase font size for y-axis labels
            },
          },
        },
        yAxis: {
          type: 'category',
          data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          axisLabel: {
            textStyle: {
              fontSize: 16, // Increase font size for y-axis labels
            },
          },
        },
        series: [
          {
          data: [2.152, 200, 150, 80, 70, 110, 130],
          itemStyle: {
            color: function (params) {
                // Apply conditional color
                if (params.value === 200) {
                    return 'red'; // Highlight the bar with value 200
                } else {
                    return '#5470C6'; // Default color
                }
            },
            borderRadius: 40, // Rounded corners at both ends
        },
          //   data: [
          //     { value: 120, itemStyle: { color: '#5470C6' } },
          //     { value: 150, itemStyle: { color: '#5470C6' } },
          //     { value: 200, itemStyle: { color: 'red' } }, // Highlighted bar
          //     { value: 80, itemStyle: { color: '#5470C6' } },
          //     { value: 130, itemStyle: { color: '#5470C6' } },
          //     { value: 110, itemStyle: { color: '#5470C6' } },
          //     { value: 70, itemStyle: { color: '#5470C6' } },
          // ],
            name: 'Sales',
            type: 'bar',
            barWidth: '40%', // Adjust bar width as needed

            
            // itemStyle: {
            //   borderRadius: [0, 10, 10, 0], // Rounded corners for horizontal bars
            //   color: '#5470C6'
            // },
            // itemStyle: {
            //   borderRadius: 40, // Rounded corners at both ends
            // },
            label: {
              show: true,
              position: 'right',
              textStyle: {
                fontSize: 24, // Increase font size for bar labels
              },
            },
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
