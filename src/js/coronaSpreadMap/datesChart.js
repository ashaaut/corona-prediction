import Plot from 'react-plotly.js'
import React, { PureComponent } from "react";
import LineChart from './lineChart'


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

    getAllCountOccurancesStatusWise(stateData, key) {
        return stateData.map(e => this.getAllCountOccurances(e, key))
    }
    getAllData(rawPatientData, states) {
        return states.map(e => this.filterData(rawPatientData, "status", e))
    }
    filterData(rawPatientData, key, value) {
        return rawPatientData.filter(data => data[key] === value)
    }
    assignKey(stateData, stateNames) {
        let newobj = {}
        for (let i = 0; i < stateData.length; i++) {
            newobj[stateNames[i]] = stateData[i]
        }
        return newobj
    }
    changeFormat(date) {
        let dateList = date.split("/");
        let day = dateList[0];
        let month = dateList[1];
        let year = dateList[2];
        let reqDate = new Date([year, month, day].join("-"));
        return reqDate
    }


    renderchart(e) {
        return (
            <div>
                e.map()
            </div>
        )
    }
    render() {
        const { data } = this.props;
        console.log(data)
        let rawPatientData = data["rawPatientData"];
        let dateAndTotalCount = this.getAllCountOccurances(rawPatientData, "reportedOn")

        let allStatus = Object.keys(this.getAllCountOccurances(rawPatientData, "status"))
        let allDataStatusWise = this.getAllData(rawPatientData, allStatus)
        let countDataDateWise = this.getAllCountOccurancesStatusWise(allDataStatusWise, "reportedOn")
        let allStatusData = this.assignKey(countDataDateWise, allStatus)
        let allStatusNames = Object.keys(allStatusData)
        console.log(allStatusData)
        return (
            <div className={"specific-chart-container"}>
                <div className={"chart-title"}> Date Chart</div>
                <div className={"app-plot-container india-chart"}>
                    <Plot
                        data={[{ type: 'scatter', x: Object.keys(dateAndTotalCount).map(d => this.changeFormat(d)), y: Object.values(dateAndTotalCount) },
                        ]} layout={{ width: "100%", height: "100%", title: data["statusName"] }} />

                </div>
                {allStatusNames.map(statusName => <LineChart
                    data={{ statusName: statusName, statusData: allStatusData[statusName] }}changeFormat={this.changeFormat} />)}

            </div>

        )
    }

}