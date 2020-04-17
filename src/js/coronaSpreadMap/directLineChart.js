import Plot from 'react-plotly.js'
import React, {PureComponent} from "react";


export default class LineChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        
        let { data } = this.props;
        console.log(data)
        let dates = data.map(e => e["date"])
        return (
            <div>
            <div className={"app-plot-container"}>
                <Plot
                    data={[{
                        type: 'scatter',
                        x: dates.map(d => this.props.changeFormat(d)),
                        y: data.map(e => e["dailyconfirmed"]),
                        marker: {
                            color: 'gray'
                        },
                        line: { shape: 'spline' }
                    },
                    ]}
                    layout={{ width: "100%", height: "100%", title: "dailyConfirmed", }} />
            </div>

            <div className={"app-plot-container"}>
                <Plot
                    data={[{
                        type: 'scatter',
                        x: dates.map(d => this.props.changeFormat(d)),
                        y: data.map(e => e["dailyrecovered"]),
                        marker: {
                            color: 'orange'
                        },
                        line: { shape: 'spline' }
                    },
                    ]} layout={{ width: "100%", height: "100%", title: "dailyRecovered" }} />
            </div>
            <div className={"app-plot-container"}>
                <Plot
                    data={[{
                        type: 'scatter',
                        x: dates.map(d => this.props.changeFormat(d)),
                        y: data.map(e => e["dailydeceased"]),
                        marker: {
                            color: 'green'
                        },
                        line: { shape: 'spline' }
                    },
                    ]}
                    layout={{ width: "100%", height: "100%", title: "dailyDeceased" }} />
            </div>
        </div>
        )

    }
} 