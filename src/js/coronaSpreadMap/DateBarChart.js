import Plot from 'react-plotly.js'
import React, { PureComponent } from "react";


export default class DateBarChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { chartColor, chartTitle, chartType, xValues, yValues } = this.props;
        while (yValues.indexOf("0") !== -1) {
            let index = yValues.indexOf("0")
            xValues.splice(index, 1)
            yValues.splice(index, 1)
        }
        return (
            <div className={"app-plot-container"}>


                <Plot
                    data={[{
                        type: chartType,
                        x: xValues,
                        y: yValues,
                        marker: {
                            color: chartColor
                        },
                    },
                    ]}
                    layout={{
                        width: "100%", height: "100%", title: chartTitle, yaxis: { fixedrange: true },
                        xaxis: { fixedrange: true }
                    }} />

            </div>

        )

    }
}
