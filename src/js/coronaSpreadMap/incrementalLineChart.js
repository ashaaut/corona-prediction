import Plot from 'react-plotly.js'
import React, { PureComponent } from "react";


export default class IncrementalLineChart extends PureComponent {
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
                            y: data.map(e => e["totalconfirmed"]),
                            marker: {
                                color: 'gray'
                            },
                            line: { shape: 'spline' }
                        },
                        ]}
                        layout={{ width: "100%", height: "100%", title: "totalConfirmed", }} />
                </div>

                <div className={"app-plot-container"}>
                    <Plot
                        data={[{
                            type: 'scatter',
                            x: dates.map(d => this.props.changeFormat(d)),
                            y: data.map(e => e["totalrecovered"]),
                            marker: {
                                color: 'orange'
                            },
                            line: { shape: 'spline' }
                        },
                        ]} layout={{ width: "100%", height: "100%", title: "totalRecovered" }} />
                </div>
                <div className={"app-plot-container"}>
                    <Plot
                        data={[{
                            type: 'scatter',
                            x: dates.map(d => this.props.changeFormat(d)),
                            y: data.map(e => e["totaldeceased"]),
                            marker: {
                                color: 'green'
                            },
                            line: { shape: 'spline' }
                        },
                        ]}
                        layout={{ width: "100%", height: "100%", title: "totalDeceased" }} />
                </div>
            </div>

        )

    }
} 