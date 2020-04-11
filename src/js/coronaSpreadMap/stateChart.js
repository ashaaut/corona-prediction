import Plot from 'react-plotly.js'
import React, {PureComponent} from "react";


export default class StateChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let {data} = this.props;
        let districtNames = Object.keys(data["stateData"]);
        let values = districtNames.map(districtName => data["stateData"][districtName]);
        const index = districtNames.indexOf("");
        let unknownData = undefined;
        if (index > -1) {
            districtNames.splice(index, 1);
            unknownData = values[index];
            values.splice(index, 1);
        }
        return (
          <div className={"app-plot-container"}>
              <Plot
                data={[{type: 'bar', x: districtNames, y: values},
                ]} layout={{width: "100%", height: "100%", title: data["stateName"]}}/>
              {unknownData ? <div>Awaiting details for {unknownData} patients</div> : ""}
          </div>

        )

    }
} 