import Plot from 'react-plotly.js'
import React, { PureComponent } from "react";
import DateChart from './datesChart'
import IndiaMap from './indiaMap'

export default class IndiaChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            stateAndStatusData: undefined
        };
    }

    componentWillMount() {
        fetch('https://api.covid19india.org/data.json', {
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
        let total = stateData["0"]

        console.log(total)
        delete stateData["0"];
        let stateNames = stateData.map(s => s["state"]);
        let confirmed = stateData.map(s => s["confirmed"]);
        let deaths = stateData.map(s => s["deaths"]);
        let recovered = stateData.map(s => s["recovered"]);

        let chartData =
            [
                {
                    type: 'bar',
                    x: stateNames,
                    y: confirmed,
                    name: "Confirmed",
                    marker: {
                        color: 'orange'
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
                    y: deaths,
                    name: "Deaths",
                    marker: {
                        color: 'gray'
                    },
                }
            ];

        return (
            <div className={"specific-chart-container"}>

                <div className={"main-title"}> India Overview</div>
                <div className={"total-count-div"}>
                    <div className={" count-div confirmed-color"}>
                        <div>Total Confirmed</div>
                        <div>{total["confirmed"]}</div>
                    </div>
                    <div className={"count-div active-color"}>
                        <div>Total Active</div>
                        <div>{total["active"]}</div>
                    </div>
                    <div className={" count-div recovered-color"}>
                        <div>Total Recovered</div>
                        <div>{total["recovered"]}</div>
                         </div>
                    <div className={"count-div deaths-color"}> 
                    <div>Total Deaths</div>
                    <div>{total["deaths"]}</div>
                    </div>
                </div>
                <IndiaMap stateData={stateData} />
                <div className="app-plot-container india-chart">
                    <Plot
                        data={chartData}
                        layout={{
                            barmode: 'stack', title: "INDIA", yaxis: { fixedrange: true },
                            xaxis: { fixedrange: true }
                        }} style={{ width: "100%", height: "100%" }} />
                </div>
                <DateChart data={data} />
            </div>

        )

    }
}
