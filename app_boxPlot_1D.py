from dash import Dash, html, Input, Output, clientside_callback, ClientsideFunction, dcc
import dash_mantine_components as dmc


rawData = [1, 1.2, 0.9, 0.5, 1.7, 2.1, 0.55, 0.65, 0.85, 1.05]



app = Dash(
    __name__,
    external_scripts=["https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"],
)
app.layout = dmc.MantineProvider(
    # forceColorScheme="dark",
    children=[
        html.Button("Click me", id="button"),
        html.Div(id="echarts-container", style={"height": "200px"}),
        dcc.Store(id="data-store", data=rawData),  # Store data
    ],
)

clientside_callback(
    ClientsideFunction(namespace="eCharts_boxPlot_1D", function_name="Chart"),
    Output("echarts-container", "children"),
    Input("button", "n_clicks"),
    Input("data-store", "data"),
)


if __name__ == "__main__":
    app.run_server(debug=True)
