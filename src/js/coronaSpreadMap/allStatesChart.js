import Plot from 'react-plotly.js'
import React, {PureComponent} from "react";
import StateChart from './stateChart'


export default class AllStateCharts extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
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

    render() {
        const {data} = this.props;

        const rawPatientData = data["rawPatientData"];
        let repeatedStateNames = this.getAllValuesForKey(rawPatientData, "state");
        
        let stateNames = this.removeDuplicates(repeatedStateNames);
        
        let uniqueStateAllData = this.getAllData(rawPatientData, stateNames);
        let r = this.getAllCountOccurancesStateWise(uniqueStateAllData, "district");
        let allStatedata = this.assignKey(r, stateNames);
        let allStateNames = Object.keys(allStatedata);

        return (

          <div className={"specific-chart-container"}>
              <div className={"main-title"}> State Charts</div>
              <div className={"multiple-chart-sideway"}>
                  {allStateNames.map(stateName => <StateChart
                    data={{stateName: stateName, stateData: allStatedata[stateName]}}/>)}
              </div>
          </div>

        )

    }
} 