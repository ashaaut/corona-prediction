import Plot from 'react-plotly.js'
import React, { PureComponent } from "react";


export default class AlgorithmicChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { SelectedScale: "linear" };
    }

    changeSelected(e) {
        this.setState({ SelectedScale: e.target.value })
    }

    render() {
        const { lineChartData } = this.props;
        const selectedChart = this.state.SelectedScale;

        return (
            <div className={"app-plot-container bar-chart"}>
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
                    data={lineChartData}
                    layout={{
                        width: "100%", height: "100%",
                        yaxis: {
                            type: selectedChart,
                            fixedrange: true
                        },
                        xaxis: {
                            fixedrange: true
                        },

                    }} />
            </div>

        )

    }
}
