import Plot from 'react-plotly.js'
import React, {PureComponent} from "react";
import StateChart from './stateChart'


export default class AllStateCharts extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {selected: "Maharashtra"};
    }

    filterData(rawPatientData, key, value) {
        return rawPatientData.filter(data => data[key] === value)
    }

    getAllValuesForKey(data, key) {
        return data.map(val => val[key])
    }

    getAllCountOccurances(dataList, key) {
        return dataList.reduce((acc, it) => {
            acc[it[key]] = acc[it[key]] + 1 || 1;
            return acc;
        }, {});
    }

    removeDuplicates(data) {
        return data.filter((a, b) => data.indexOf(a) === b)
    };

    getAllData(rawPatientData, states) {
        return states.map(e => this.filterData(rawPatientData, "state", e))
    }

    getAllCountOccurancesStateWise(stateData, key) {
        return stateData.map(e => this.getAllCountOccurances(e, key))
    }

    assignKey(stateData, stateNames) {
        let newobj = {}
        for (let i = 0; i < stateData.length; i++) {
            newobj[stateNames[i]] = stateData[i]
        }
        return newobj
    }

    changeSelected(e) {
        this.setState({selected: e.target.value})
    }

    render() {
        const {data} = this.props;
        const rawPatientData = data["rawPatientData"];
        let repeatedStateNames = this.getAllValuesForKey(rawPatientData, "state");
        let stateNames = this.removeDuplicates(repeatedStateNames);
        let uniqueStateAllData = this.getAllData(rawPatientData, stateNames);
        let r = this.getAllCountOccurancesStateWise(uniqueStateAllData, "district");
        let allStatedata = this.assignKey(r, stateNames);
        let allStateNames = Object.keys(allStatedata);
        let selectedState = this.state.selected;
        let selectedData = allStatedata[selectedState];

        return (
          <div className={"specific-chart-container"}>
              <div className={"main-title"}> State Charts</div>
              <div className={"chart-selector-container"}>
                  <div className={"chart-selector"}>
                      <div className={"chart-title"}>Selected Chart</div>
                      <select name="select" onChange={(e) => this.changeSelected(e)} value={this.state.selected}>
                          {allStateNames.map(function (n) {
                              return (<option value={n} key={`option-${n}`}>{n}</option>);
                          })}
                      </select>
                  </div>
                  <div className={"selected-plot-container"}>
                      <StateChart
                        data={{
                            stateName: selectedState,
                            stateData: selectedData
                        }}/>
                  </div>

              </div>
              <div className={"main-title"}> All State Charts</div>
              <div className={"multiple-chart-sideway"}>
                  {allStateNames.map(stateName => <StateChart
                    key={stateName}
                    data={{stateName: stateName, stateData: allStatedata[stateName]}}/>)}
              </div>
          </div>

        )

    }
}
