import Plot from 'react-plotly.js'
import React, {PureComponent} from "react";


export default class AlgorithmicChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {SelectedScale: "linear"};
    }

    changeSelected(e) {
        this.setState({SelectedScale: e.target.value})
    }

    render() {
        const {chartColor, chartTitle, chartType, xValues, yValues} = this.props;
        console.log(xValues)
        const selectedChart = this.state.SelectedScale;
        while (yValues.indexOf("0") !== -1) {
            let index = yValues.indexOf("0");
            xValues.splice(index, 1);
            yValues.splice(index, 1);
        }
        return (
          <div className={"app-plot-container"}>
              <div className={"tool-bar-section"}>
                  <div className={"scale-selector"}>
                      <div className={"selected-scale"}>Scale - </div>
                      <select className={"scale-option-header"} name="select" onChange={(e) => this.changeSelected(e)}
                              value={this.state.selected}>
                          <option>linear</option>
                          <option>log</option>
                      </select>
                  </div>
              </div>
              <Plot
                data={[{
                    type: chartType,
                    x: xValues,
                    y: yValues,
                    marker: {
                        color: chartColor
                    },
                    line: {shape: 'spline'}
                },
                ]}
                layout={{
                    width: "100%", height: "100%", title: chartTitle,
                    yaxis: {
                        type: selectedChart,
                        fixedrange: true
                    },
                    xaxis: {
                        fixedrange: true
                    },

                }}/>
          </div>

        )

    }
}
