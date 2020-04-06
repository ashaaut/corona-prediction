import React, { PureComponent } from "react";
// import Graph from "react-graph-vis";
import Plot from 'react-plotly.js'
import StateChart from "./stateChart";


export default class CoronaMap extends PureComponent {
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
        // let cityVsCount=this.getAllCountOccurances(rawPatientData,"city")
        let repeatedStateNames = this.getAllValuesForKey(rawPatientData, "state")
        let stateNames = this.removeDuplicates(repeatedStateNames)
        let uniqueStateAllData = this.getAllData(rawPatientData, stateNames)
        let r = this.getAllCountOccurancesStateWise(uniqueStateAllData, "city")
        let allStatedata = this.assignKey(r, stateNames)
        let allStateNames = Object.keys(allStatedata)

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


        return <div className={"all-plots"}>
            {coronaData.map(e => <div className={"plot-container"}>
                {this.renderChart(e)}
            </div>
            )}
            <div className={"all-state-data"}>
            <h2>All State Data</h2>
                {allStateNames.map(stateName => <div className={"statechart"}><StateChart data={{ stateName: stateName, stateData: allStatedata[stateName] }} /></div>)}
            </div>
        </div>

    }
}


