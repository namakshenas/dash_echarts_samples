from dash import Dash, html, Input, Output, clientside_callback, ClientsideFunction, dcc
import dash_mantine_components as dmc


rawData = [
    [26, 40, 100],
    [23, 30, 86],
    [20, 35, 49],
    [19, 75, 75],
    [18, 85, 70],
    [15, 100, 57],
    [21, 25, 72],
    [17, 60, 62],
    [11, 45, 51],
    [17, 65, 76],
    [13, 35, 43],
    [15, 50, 71],
    [10, 100, 47],
    [7, 70, 67],
    [9, 80, 34]
]

columns = ['Number of Workforce', 'Higher Education Index', 'Salary and Wage Index']


app = Dash(
    __name__,
    external_scripts=["https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"],
)
app.layout = dmc.MantineProvider(
    # forceColorScheme="dark",
    children=[
        html.Button("Click me", id="button"),
        html.Div(id="echarts-container", style={"height": "800px"}),
        dcc.Store(id="y-axis-store", data=columns),  # Store y-axis
        dcc.Store(id="data-store", data=rawData),  # Store data
    ],
)

clientside_callback(
    ClientsideFunction(namespace="eCharts_boxPlot", function_name="Chart"),
    Output("echarts-container", "children"),
    Input("button", "n_clicks"),
    Input("y-axis-store", "data"),
    Input("data-store", "data"),
)


if __name__ == "__main__":
    app.run_server(debug=True)
