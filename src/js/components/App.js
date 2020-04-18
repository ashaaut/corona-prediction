import React from "react";
import {hot} from 'react-hot-loader/root';
import data from "./../../data/data.json"
import AllStates from '../coronaSpreadMap/allStatesChart'
import IndiaChart from '../coronaSpreadMap/indiaChart'
import Header from './header'
import Footer from './footer'
import GeneralDist from "../coronaSpreadMap/genearlDist";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: undefined,
            selectedChart: "india",
            stateAndStatusData:undefined
        }
        this.changeChart = this.changeChart.bind(this)
    }
    fetchData() {
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

    componentWillMount() {
        fetch('https://api.rootnet.in/covid19-in/unofficial/covid19india.org', {
            cors: 'no-cors',
            method: 'GET',
            redirect: 'follow',
        })
          .then(resp => resp.json())
          .then(res => {
              this.setState({data: res.data})
          })
          .catch(err => console.log('error', err))
    }


    changeChart(chartType) {
        this.setState({selectedChart: chartType})
    }

    renderChart() {
        return {
            "generalDist": <GeneralDist data={this.state.data}/>,
            "state": <AllStates data={this.state.data}/>,
            "india": this.state.stateAndStatusData?<IndiaChart data={this.state.stateAndStatusData}/>:<div className={"data-loading"}> Loading Data...... </div>
        }[this.state.selectedChart]
    }

    render() {
        if (!this.state.stateAndStatusData) {
            this.fetchData()
        }
        return this.state.data ? <div className="app">
            <Header navigateChart={this.changeChart} selectedButton={this.state.selectedChart}/>
            <div className={"chart-container"}>
                {this.renderChart()}
            </div>
            <Footer/>
        </div> : <div className={"data-loading"}> Loading Data...... </div>
    }
}

export default hot(App);
