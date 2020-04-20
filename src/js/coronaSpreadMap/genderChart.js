import React, { PureComponent } from "react";
import Plot from 'react-plotly.js'

export default class GenderChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};

    }

    filterData(rawData, key, value) {
        return rawData.filter(data => data[key] === value)
    }

    renderChart(e) {
        return {
            "pie": <Plot data={[{
                type: 'pie', labels: Object.keys(e["content"]),
                values: Object.values(e["content"])
            },
            ]} layout={{ width: "100%", height: "100%", title: e["name"] }} />,

            "bar": <Plot
                data={[{ type: 'bar', x: Object.keys(e["content"]), y: Object.values(e["content"]) },
                ]} layout={{
                    width: "100%", height: "100%", title: e["name"], yaxis: { fixedrange: true },
                    xaxis: { fixedrange: true }
                }} />

        }[e["chartType"]]
    }

    render() {
        const data = this.props
        let rawData = data["data"]["raw_data"]
        let males = this.filterData(rawData, "gender", "M")
        let females = this.filterData(rawData, "gender", "F");
        let unknownData = this.filterData(rawData, "gender", "");


        const coronaData = [
            {
                "chartType": "bar",
                "name": "Gender distribution Bar",
                "content": { "male": males.length, "female": females.length }
            },

            {
                "chartType": "pie",
                "name": "Gender distribution Pie",
                "content": { "male": males.length, "female": females.length }
            },


        ];


        return <div className={"specific-chart-container"}>
            <div className={"chart-title"}> Gender Distribution</div>
            <div className={"multiple-chart-sideway"}>
                {coronaData.map(e => <div className={"app-plot-container"}>
                    {this.renderChart(e)}
                    Awaiting details for {unknownData.length} patients
                  </div>
                )
                }
            </div>
        </div>

    }
}


