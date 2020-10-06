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
        let newdates=dates.map(d => this.props.changeFormat(d));
        let confirmed=data.map(e => e["totalconfirmed"]);
        let recovered=data.map(e => e["totalrecovered"]);
        let deceased= data.map(e => e["totaldeceased"]);
        while (confirmed.indexOf("0") !== -1) {
            let index = confirmed.indexOf("0");
            newdates.splice(index, 1);
            confirmed.splice(index, 1);
            deceased.splice(index,1);
            recovered.splice(index,1);
        }
        let lineChartData =
            [
                {
                    type: 'scatter',
                    x: newdates,
                    y: confirmed,
                    name: "Confirmed",
                    marker: {
                        color: 'red'
                    },
                },

                {
                    type: 'scatter',
                    x: newdates,
                    y: recovered,
                    name: "Recovered",
                    marker: {
                        color: 'green'
                    },

                },

                {
                    type: 'scatter',
                    x: newdates,
                    y:deceased,
                    name: "Deaths",
                    marker: {
                        color: 'gray'
                    },
                }
            ];

        return (
            <div className="specific-chart-container">
                <AlgorithmicChart lineChartData={lineChartData} />
            </div>

        )

    }
}
