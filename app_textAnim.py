from dash import Dash, html, Input, Output, clientside_callback, ClientsideFunction, dcc
import dash_mantine_components as dmc


textData = "10"



app = Dash(
    __name__,
    external_scripts=["https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"],
)
app.layout = dmc.MantineProvider(
    # forceColorScheme="dark",
    children=[
        html.Button("Click me", id="button"),
        html.Div(id="echarts-container-text-anim", style={"height": "200px"}),
        dcc.Store(id="data-store", data=textData),  # Store data
    ],
)

clientside_callback(
    ClientsideFunction(namespace="eCharts_textAnim", function_name="Chart"),
    Output("echarts-container-text-anim", "children"),
    Input("button", "n_clicks"),
    Input("data-store", "data"),
)


if __name__ == "__main__":
    app.run_server(debug=True)
