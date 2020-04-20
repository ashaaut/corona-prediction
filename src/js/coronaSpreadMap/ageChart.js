import Plot from 'react-plotly.js'
import React, { PureComponent } from "react";


export default class AgeChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    filterData(rawData, key, value) {
        return rawData.filter(data => data[key] === value)
    }

    getAgeBetween(data, ageArray, key) {
        return data.filter(d => parseInt(d[key]) < ageArray[1] && parseInt(d[key]) > ageArray[0])
    }

    render() {
        const data = this.props
        let rawData = data["data"]["raw_data"]
        let ageData = {};
        ageData["ageBetween0To20"] = this.getAgeBetween(rawData, [0, 20], "agebracket").length;
        ageData["ageBetween20To40"] = this.getAgeBetween(rawData, [20, 40], "agebracket").length;
        ageData["ageBetween40To60"] = this.getAgeBetween(rawData, [40, 60], "agebracket").length;
        ageData["ageBetween60To80"] = this.getAgeBetween(rawData, [60, 80], "agebracket").length;
        ageData["ageBetween80To110"] = this.getAgeBetween(rawData, [80, 110], "agebracket").length;
        let ageUnknown = this.filterData(rawData, "agebracket", "").length;
        return (
            <div className={"specific-chart-container"}>
                <div className={"chart-title"}> Age Distribution</div>
                <div className={"multiple-chart-sideway"}>
                    <div className={"app-plot-container"}>
                        <Plot
                            data={[{ type: 'bar', x: Object.keys(ageData), y: Object.values(ageData) },
                            ]} layout={{
                                width: "100%", height: "100%", title: "Age Distribution Bar", yaxis: { fixedrange: true },
                                xaxis: { fixedrange: true }
                            }} />
                        Awaiting details for {ageUnknown} patients
                  </div>
                    <div className={"app-plot-container"}>
                        <Plot data={[{
                            type: 'pie', labels: Object.keys(ageData),
                            values: Object.values(ageData)
                        },
                        ]} layout={{ width: "100%", height: "100%", title: "Age Distribution Pie" }} />
                        Awaiting details for {ageUnknown} patients
                  </div>

                </div>
            </div>

        )
    }

}
