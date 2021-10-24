import Plot from 'react-plotly.js'
import React, { PureComponent } from "react";

export default class IndiaChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            stateAndStatusData: undefined
        }

    }
    componentWillMount() {
        fetch('https://data.covid19india.org/data.json', {
            cors: 'no-cors',
            method: 'GET',
            redirect: 'follow',
        })
            .then(resp => resp.json())
            .then(res => {
                this.setState({ stateAndStatusData: res })
            })
            .catch(err => console.log('error', err))
    }

    render() {
        if (!this.state.stateAndStatusData) {
            return <div className={"data-loading"}> Loading Data...... </div>
        }
        const data = this.state.stateAndStatusData;
        let stateData = data['statewise'];
        delete stateData["0"];
        let stateNames = stateData.map(s => s["state"]);
        let confirmed = stateData.map(s => s["confirmed"]);
        let deaths = stateData.map(s => s["deaths"]);
        let recovered = stateData.map(s => s["recovered"]);
        let active = stateData.map(s => s["active"]);
        let chartData =
            [
                {
                    type: 'bar',
                    x: stateNames,
                    y: confirmed,
                    name: "Confirmed",
                    marker: {
                        color: 'red'
                    },
                },

                {
                    type: 'bar',
                    x: stateNames,
                    y: recovered,
                    name: "Recovered",
                    marker: {
                        color: 'green'
                    },

                },
                {
                    type: 'bar',
                    x: stateNames,
                    y: active,
                    name: "active",
                    marker: {
                        color: 'blue'
                    },
                },

                {
                    type: 'bar',
                    x: stateNames,
                    y: deaths,
                    name: "Deaths",
                    marker: {
                        color: 'gray'
                    },
                }
            ];

        return (
            <div className={"specific-chart-container"}>
                <div className="app-plot-container bar-chart">
                    <Plot
                        data={chartData}
                        layout={{
                            barmode: 'stack', title: "INDIA"
                        }} style={{ width: "100%", height: "100%" }}
                        />
                </div>
            </div>

        )

    }
}
