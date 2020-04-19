import Plot from 'react-plotly.js'
import React, {PureComponent} from "react";


export default class LineChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {

        let {data} = this.props;
        let dates = data.map(e => e["date"])
        return (
          <div>
              <div className={"app-plot-container"}>
                  <Plot
                    data={[{
                        type: 'bar',
                        x: dates.map(d => this.props.changeFormat(d)),
                        y: data.map(e => e["dailyconfirmed"]),
                        marker: {
                            color: 'orange'
                        },
                    },
                    ]}
                    layout={{
                        width: "100%", height: "100%", title: "dailyConfirmed", yaxis: {fixedrange: true},
                        xaxis: {fixedrange: true}
                    }}/>
              </div>

              <div className={"app-plot-container"}>
                  <Plot
                    data={[{
                        type: 'bar',
                        x: dates.map(d => this.props.changeFormat(d)),
                        y: data.map(e => e["dailyrecovered"]),
                        marker: {
                            color: 'green'
                        },
                    },
                    ]} layout={{
                      width: "100%", height: "100%", title: "dailyRecovered", yaxis: {fixedrange: true},
                      xaxis: {fixedrange: true}
                  }}/>
              </div>
              <div className={"app-plot-container"}>
                  <Plot
                    data={[{
                        type: 'bar',
                        x: dates.map(d => this.props.changeFormat(d)),
                        y: data.map(e => e["dailydeceased"]),
                        marker: {
                            color: 'gray'
                        },
                    },
                    ]}
                    layout={{
                        width: "100%", height: "100%", title: "dailyDeceased", yaxis: {fixedrange: true},
                        xaxis: {fixedrange: true}
                    }}/>
              </div>
          </div>
        )

    }
}
