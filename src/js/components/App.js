
import React from "react";
import { hot } from 'react-hot-loader/root';
import GenderChart from "../coronaSpreadMap/gender"
import data from "./../../data/data.json"
import Age from '../coronaSpreadMap/ageChart'
import AllStates from '../coronaSpreadMap/allStatesChart'
import IndiaChart from '../coronaSpreadMap/indiaChat'
import Header from './header'
 import Footer from './footer'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data.data,
      selectedChart:"india"
    }
  }
   // componentWillMount() {
    //     fetch('https://api.rootnet.in/covid19-in/unofficial/covid19india.org', {
    //         cors: 'no-cors',
    //         method: 'GET',
    //         redirect: 'follow',
    //     })
    //       .then(resp => resp.json())
    //       .then(res => {
    //           this.setState({data: res.data})
    //       })
    //       .catch(err => console.log('error', err))
    // }

  changeChart(chartType) {
    this.setState({ selectedChart: chartType })
  }
  renderChart(){
    return {"gender": <GenderChart data={this.state.data}/> ,
    "age":<Age data={this.state.data}/>,
    "state":<AllStates data={this.state.data}/>,
    "india": <IndiaChart data={this.state.data} />}[this.state.selectedChart]
  }

  render() {
    return <div className="app">
      <Header />
      <div className={"main-button-container"}>
        <button onClick={() => this.changeChart("india")}>India</button>
        <button onClick={() => this.changeChart("gender")}>Gender Plots</button>
        <button onClick={() => this.changeChart("age")}>Age Plots</button>
        <button onClick={() => this.changeChart("state")}>State Plots</button>
      </div>
      <div className={"chart-container"}>
        {this.renderChart()}
      </div>
      
    <Footer/>
    </div>




  }
}

export default hot(App);
