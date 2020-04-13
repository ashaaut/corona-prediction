import Plot from 'react-plotly.js'
import React, { PureComponent } from "react";


export default class DateChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getAllCountOccurances(dataList, key) {
        return dataList.reduce((acc, it) => {
            acc[it[key]] = acc[it[key]] + 1 || 1;
            return acc;
        }, {});
    }

    render() {
        const { data } = this.props;
        console.log(data)
        let rawPatientData = data["rawPatientData"];
        let dateAndTotalCount = this.getAllCountOccurances(rawPatientData, "reportedOn")


        return (
            <div className={"specific-chart-container"}>
                <div className={"chart-title"}> Date Chart</div>
                <div className={"app-plot-container india-chart"}>
                    <Plot
                        data={[{ type: 'scatter', x: Object.keys(dateAndTotalCount), y: Object.values(dateAndTotalCount) },
                        ]} layout={{ width: "100%", height: "100%", title: "Date Chart" }} />
                </div>
            </div>

        )
    }

}