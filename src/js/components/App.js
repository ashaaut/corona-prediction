import React from "react";
import { hot } from 'react-hot-loader/root';
import data from "./../../data/data.json"
import AllStates from '../coronaSpreadMap/allStatesChart'
import IndiaData from '../coronaSpreadMap/indiaData'
import Header from './header'
import Footer from './footer'
import GeneralDist from "../coronaSpreadMap/genearlDist";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: undefined,
            selectedChart: "india",
            error: undefined
        };
        this.changeChart = this.changeChart.bind(this)
    }

    componentWillMount() {
        fetch('https://data.covid19india.org/data.json/ka', {
            cors: 'no-cors',
            method: 'GET',
            redirect: 'follow',
        })
            .then(resp => resp.json())
            .then(res => {
                this.setState({ data: res })
            })
            .catch(err => this.setState({ data: data, error: "failed to fetch" }))
    }


    changeChart(chartType) {
        this.setState({ selectedChart: chartType })
    }

    renderChart() {
        return {
            "generalDist": <GeneralDist data={this.state.data} />,
            "state": <AllStates data={this.state.data} />,
            "india": <IndiaData />
        }[this.state.selectedChart]
    }

    render() {
        console.log(this.state.data)
        return this.state.data ? <div className="app">
            <Header navigateChart={this.changeChart} selectedButton={this.state.selectedChart} />
            <center><h2> {this.state.error ? "Showing Old Data" : ""}</h2> </center>
            <div className={"chart-container"}>
                {this.renderChart()}
            </div>
            <Footer />
        </div> : <div className={"data-loading"}> Loading Data...... </div>
    }
}

export default hot(App);
