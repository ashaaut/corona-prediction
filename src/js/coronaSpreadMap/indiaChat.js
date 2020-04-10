import Plot from 'react-plotly.js'
import React, { PureComponent } from "react";
import StateChart from './stateChart'


export default class indiaChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {



        };
    }
    filterData(rawPatientData, key, value) {
        return rawPatientData.filter(data => data[key] === value)
    }

    getAllValuesForKey(data, key) {
        return data.map(val => val[key])
    }
    removeDuplicates(data) {
        return data.filter((a, b) => data.indexOf(a) === b)
    };

    getAllData(rawPatientData, states) {
        return states.map(e => this.filterData(rawPatientData, "state", e))
    }



    getAllValuesForAllKeys(obj) {
        return Object.keys(obj).map(e => obj[e].length)
    }


    render() {
        const { data } = this.props;
        const rawPatientData = data["rawPatientData"]
        let repeatedStateNames = this.getAllValuesForKey(rawPatientData, "state")
        let stateNames = this.removeDuplicates(repeatedStateNames)
        let uniqueStateAllData = this.getAllData(rawPatientData, stateNames)
        let values = this.getAllValuesForAllKeys(uniqueStateAllData)
        let total = rawPatientData.length
        return (
            <div className={"specific-chart-container"}>
            <div className={"chart-title"}> Total:{total}</div>
                <div className="plot-container">
                    <Plot
                        data={[{ type: 'bar', x: stateNames, y: values },
                        ]} layout={{ width: "100%", height: "100%", title: "INDIA" }} />
                </div>
            </div>

        )

    }
} 