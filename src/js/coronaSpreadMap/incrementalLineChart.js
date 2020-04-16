import Plot from 'react-plotly.js'
import React, {PureComponent} from "react";


export default class IncrementalLineChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        let {data,color} = this.props;
        let dates = Object.keys(data["statusData"]);
        let values = dates.map(dates => data["statusData"][dates]);
        return (
          <div className={"app-plot-container"}>
              <Plot
                data={[{
                    type: 'scatter',
                    marker: {
                        color: color
                    },
                    x: dates.map(d => this.props.changeFormat(d)),
                    y: this.props.getIncrementalValues(values),
                    line: {shape: 'spline'}
                },
                ]} layout={{width: "100%", height: "100%", title: data["statusName"]}}/>
          </div>

        )

    }
} 