import Plot from 'react-plotly.js'
import React, {PureComponent} from "react";
import LineChart from './directLineChart'
import IncrementalLineChart from './incrementalLineChart'


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

    getIncrementalValues(list) {
        let newValues = []
        for (let i = 0; i < list.length; i++) {
            let sum = 0
            for (let j = 0; j <= i; j++) {
                sum += list[j]
            }
            newValues.push(sum)
        }
        return newValues
    }

    render() {
        const {data} = this.props;
        let rawPatientData = data["rawPatientData"];
        let allStatus = Object.keys(this.getAllCountOccurances(rawPatientData, "status"))
        let allDataStatusWise = this.getAllData(rawPatientData, allStatus)
        let countDataDateWise = this.getAllCountOccurancesStatusWise(allDataStatusWise, "reportedOn")
        let allStatusData = this.assignKey(countDataDateWise, allStatus)
        delete allStatusData["Migrated"];
        delete allStatusData["undefined"];
        let allStatusNames = Object.keys(allStatusData)
        let colorMap = {"Hospitalized": "orange", "Recovered": "green", "Deceased": "gray"}
        // let recovered = allStatusData["Recovered"]
        // let values = Object.values(recovered)
        // console.log(values.reduce((a, b) => a + b))
        // console.log(this.getIncrementalValues(values))

        return (
          <div>
              <div className={"main-title"}> Date specific Charts</div>
              <div className={"multiple-chart-sideway"}>
                  <div className={"multiple-chart-updown"}>
                      <div className={"chart-title"}> Incremental line charts</div>
                      {allStatusNames.map(statusName => <div className={"multiple-chart-sideway"}><IncrementalLineChart
                        data={{statusName: statusName, statusData: allStatusData[statusName]}}
                        changeFormat={this.changeFormat} getIncrementalValues={this.getIncrementalValues}
                        color={colorMap[statusName]}/></div>)}
                  </div>
                  <div className={"multiple-chart-updown"}>
                      <div className={"chart-title"}> Date Patient Counts</div>
                      {allStatusNames.map(statusName => <div className={"multiple-chart-sideway"}><LineChart
                        data={{statusName: statusName, statusData: allStatusData[statusName]}}
                        changeFormat={this.changeFormat} color={colorMap[statusName]}/></div>)}
                  </div>
              </div>
          </div>

        )

    }

}