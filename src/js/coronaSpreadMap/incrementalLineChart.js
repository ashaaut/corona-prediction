import Plot from 'react-plotly.js'
import React, { PureComponent } from "react";
import AlgorithmicChart from './algorithmmicChart';


export default class IncrementalLineChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            typeConfirn: "linear",

        };

    }
    changeSelected(e) {
        this.setState({ typeConfirn: e.target.value })
    }


    render() {
        let { data } = this.props;
        let dates = data.map(e => e["date"]);
        return (
            <div>
                <AlgorithmicChart chartColor="orange"
                    chartTitle="Total Confirmed"
                    chartType="scatter"
                    xValues={dates.map(d => this.props.changeFormat(d))}
                    yValues={data.map(e => e["totalconfirmed"])} />
                <AlgorithmicChart chartColor="green"
                    chartTitle="Total Recovered"
                    chartType="scatter"
                    xValues={dates.map(d => this.props.changeFormat(d))}
                    yValues={data.map(e => e["totalrecovered"])} />

                <AlgorithmicChart chartColor="gray"
                    chartTitle="Total Deceased"
                    chartType="scatter"
                    xValues={dates.map(d => this.props.changeFormat(d))}
                    yValues={data.map(e => e["totaldeceased"])} />
            </div>

        )

    }
}
