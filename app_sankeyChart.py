from dash import Dash, dcc, html, Input, Output, clientside_callback, ClientsideFunction
import dash_mantine_components as dmc
import json


with open('assets/flow.json', 'r') as file:
    data = json.load(file)


app = Dash(
    __name__,
    external_scripts=["https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"],
)
app.layout = dmc.MantineProvider(
    # forceColorScheme="dark",
    theme={
        "colors": {
            "myColor": [
                "#F2FFB6",
                "#DCF97E",
                "#C3E35B",
                "#AAC944",
                "#98BC20",
                "#86AC09",
                "#78A000",
                "#668B00",
                "#547200",
                "#455D00",
            ]
        },
    },
    children=[
        html.Button("Click me", id="button"),
        html.Div(id="echarts-container", style={"height": "800px"}),
        dcc.Store(id="data-store", data=data),  # Store data
    ],
)

clientside_callback(
    ClientsideFunction(namespace="eCharts", function_name="sankeyChart"),
    Output("echarts-container", "children"),
    [
        Input("button", "n_clicks"),
        Input("data-store", "data"),
    ],
)


if __name__ == "__main__":
    app.run_server(debug=True)
