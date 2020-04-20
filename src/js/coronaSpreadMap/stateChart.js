import Plot from 'react-plotly.js'
import React, { PureComponent } from "react";


export default class StateChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let { data } = this.props;
        let districtNames = Object.keys(data["stateData"])
        let values = districtNames.map(districtName => data["stateData"][districtName]["confirmed"])
        return (
            <div className={"app-plot-container"}>
                <Plot
                    data={[{ type: 'bar', x: districtNames, y: values },
                    ]} layout={{
                        width: "100%", height: "100%", title: data["stateName"], yaxis: { fixedrange: true },
                        xaxis: { fixedrange: true }
                    }} />

            </div>

        )

    }
}
