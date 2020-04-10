import Plot from 'react-plotly.js'
import React, { PureComponent } from "react";


export default class ageChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    filterData(rawPatientData, key, value) {
        return rawPatientData.filter(data => data[key] === value)
    }

    getAgeBetween(data, ageArray, key) {
        return data.filter(d => parseInt(d[key]) < ageArray[1] && parseInt(d[key]) > ageArray[0])
    }
    render() {
        const { data } = this.props
        const rawPatientData = data["rawPatientData"]
        let ageData = {}
        ageData["ageBetween0To25"] = this.getAgeBetween(rawPatientData, [0, 25], "ageEstimate").length
        ageData["ageBetween0To25"] = this.getAgeBetween(rawPatientData, [0, 25], "ageEstimate").length
        ageData["ageBetween25To50"] = this.getAgeBetween(rawPatientData, [25, 50], "ageEstimate").length
        ageData["ageBetween50To75"] = this.getAgeBetween(rawPatientData, [50, 75], "ageEstimate").length
        ageData["ageBetween75To110"] = this.getAgeBetween(rawPatientData, [75, 110], "ageEstimate").length
        ageData["ageUnknown"] = this.filterData(rawPatientData, "ageEstimate", "").length
        console.log(ageData)
        return (
            <div className={"specific-chart-container"}>
                <div className={"chart-title"}> Age Distribution</div>
                <div className={"plot-container"}>
                    <Plot
                        data={[{ type: 'bar', x: Object.keys(ageData), y: Object.values(ageData) },
                        ]} layout={{ width: "100%", height: "100%", title: "Age Distribution" }} />

                </div>
            </div>

        )
    }

}