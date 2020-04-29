import Plot from 'react-plotly.js'
import React, { Component } from "react";
import DateBarChart from './DateBarChart'


export default class lineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {

        let { data } = this.props;
        let dates = data.map(e => e["date"])

        return (
            <div>
                    <DateBarChart
                        chartColor='orange'
                        chartTitle="Daily Confirmed"
                        chartType="bar"
                        xValues={dates.map(d => this.props.changeFormat(d))}
                        yValues={data.map(e => e["dailyconfirmed"])} />
        

                    <DateBarChart
                        chartColor='green'
                        chartTitle="Daily Recovered" s
                        chartType="bar"
                        xValues={dates.map(d => this.props.changeFormat(d))}
                        yValues={data.map(e => e["dailyrecovered"])} />

                    <DateBarChart
                        chartColor='gray'
                        chartTitle="Daily Deceased"
                        chartType="bar"
                        xValues={dates.map(d => this.props.changeFormat(d))}
                        yValues={data.map(e => e["dailydeceased"])} />
                
            </div>
        )

    }
}
