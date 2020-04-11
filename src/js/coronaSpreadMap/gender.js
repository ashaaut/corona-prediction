import React, { PureComponent } from "react";
import Plot from 'react-plotly.js'

export default class GenderChart extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {

        };

    }
    filterData(rawPatientData, key, value) {
        return rawPatientData.filter(data => data[key] === value)
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
                ]} layout={{ width: "100%", height: "100%", title: e["name"] }} />

        }[e["chartType"]]
    }

    render() {
        const { data } = this.props
        let rawPatientData = data["rawPatientData"]
        let males = this.filterData(rawPatientData, "gender", "male")
        let females = this.filterData(rawPatientData, "gender", "female")

        const coronaData = [
            {
                "chartType": "bar",
                "name": "Gender distribution",
                "content": { "male": males.length, "female": females.length }
            },

            {
                "chartType": "pie",
                "name": "Gender distribution",
                "content": { "male": males.length, "female": females.length }
            },


        ];


        return <div className={"specific-chart-container"}>
        <div className={"chart-title"}> Gender Distribution</div>
        <div className={"multiple-chart-container"}>
        {coronaData.map(e => <div className={"plot-container"}>
                {this.renderChart(e)}
            </div>
            )
}
            </div> 
        </div>

    }
}

