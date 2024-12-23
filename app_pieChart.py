from dash import Dash, html, Input, Output, clientside_callback, ClientsideFunction, dcc
import dash_mantine_components as dmc


rawData = [
        { 'value': 70, 'name': 'CRS' },
        { 'value': 80, 'name': 'IRS' },
        { 'value': 100, 'name': 'DRS' }
    ]

app = Dash(
    __name__,
    external_scripts=["https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"],
)
app.layout = dmc.MantineProvider(
    # forceColorScheme="dark",
    children=[
        html.Button("Click me", id="button"),
        html.Div(id="echarts-container", style={"height": "100px"}), 
        dcc.Store(id="data-store", data=rawData),  
    ],
)

clientside_callback(
    ClientsideFunction(namespace="eCharts_pieChart", function_name="Chart"),
    Output("echarts-container", "children"),
    Input("button", "n_clicks"),
    Input("data-store", "data"),
)


if __name__ == "__main__":
    app.run_server(debug=True)
