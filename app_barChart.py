from dash import Dash, html, Input, Output, clientside_callback, ClientsideFunction
import dash_mantine_components as dmc


app = Dash(
    __name__,
    external_scripts=["https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"],
)
app.layout = dmc.MantineProvider(
    # forceColorScheme="dark",
    children=[
        html.Button("Click me", id="button"),
        html.Div(id="echarts-container", style={"height": "800px"}),
    ],
)

clientside_callback(
    ClientsideFunction(namespace="eCharts_barChart", function_name="Chart"),
    Output("echarts-container", "children"),
    Input("button", "n_clicks"),
)


if __name__ == "__main__":
    app.run_server(debug=True)
