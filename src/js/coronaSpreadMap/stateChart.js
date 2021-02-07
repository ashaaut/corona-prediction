import Plot from 'react-plotly.js'
import React, { PureComponent } from "react";


export default class StateChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { data } = this.props;
        let unknown = 0;

        if (data["stateData"]["Unknown"]) {
            unknown = data["stateData"]["Unknown"]["confirmed"]
        }
        let districtNames = Object.keys(data["stateData"])
        let confirmed = districtNames.map(districtName => data["stateData"][districtName]["confirmed"])
        let active = districtNames.map(districtName => data["stateData"][districtName]["active"])
        let recovered = districtNames.map(districtName => data["stateData"][districtName]["recovered"])
        let deaths = districtNames.map(districtName => data["stateData"][districtName]["deceased"])

        let index = districtNames.indexOf("Unknown")
        if (index > 0) {
            districtNames.splice(index, 1)
            confirmed.splice(index, 1)
        }
        let stateChartData =
            [
                {
                    type: 'bar',
                    x: districtNames,
                    y: confirmed,
                    name: "Confirmed",
                    marker: {
                        color: 'red'
                    },
                    transforms: [{
                        type: 'sort',
                        target: 'y',
                        order: 'descending'
                    }]

                },


                {
                    type: 'bar',
                    x: districtNames,
                    y: recovered,
                    name: "Recovered",
                    marker: {
                        color: 'green'
                    },

                },
                {
                    type: 'bar',
                    x: districtNames,
                    y: active,
                    name: "active",
                    marker: {
                        color: 'blue'
                    },
                },

                {
                    type: 'bar',
                    x: districtNames,
                    y: deaths,
                    name: "Deaths",
                    marker: {
                        color: 'gray'
                    },
                }
            ];
        return (
            <div className={"app-plot-container"}>
            <Plot
                data={stateChartData}
                 layout={{
                     barmode:'stack',width: "100%", height: "100%", title: data["stateName"]
                }} />
            {unknown!=0?<div>Awaiting details for {unknown} patients</div>:<div></div>}

        </div>
        )

    }
}
