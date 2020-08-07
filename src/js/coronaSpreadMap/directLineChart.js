import Plot from 'react-plotly.js'
import React, {Component} from "react";
import AlgorithmicChart from "./algorithmmicChart";


export default class lineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {

        let {data} = this.props;
        let dates = data.map(e => e["date"])

        return (
          
          <div>
            
              <AlgorithmicChart
                chartColor='orange'
                chartTitle="Daily Confirmed"
                chartType="bar"
                xValues={dates.map(d => this.props.changeFormat(d))}
                yValues={data.map(e => e["dailyconfirmed"])}/>


              <AlgorithmicChart
                chartColor='green'
                chartTitle="Daily Recovered" 
                chartType="bar"
                xValues={dates.map(d => this.props.changeFormat(d))}
                yValues={data.map(e => e["dailyrecovered"])}/>

              <AlgorithmicChart
                chartColor='gray'
                chartTitle="Daily Deceased"
                chartType="bar"
                xValues={dates.map(d => this.props.changeFormat(d))}
                yValues={data.map(e => e["dailydeceased"])}/>

          </div>
        )

    }
}
