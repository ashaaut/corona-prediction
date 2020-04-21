import Plot from 'react-plotly.js'
import React, { PureComponent } from "react";


export default class StateChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { data } = this.props;
        let unknown = 0;

        if (data["stateData"]["Unknown"]) {
            unknown = data["stateData"]["Unknown"]["confirmed"]
        }
        let districtNames = Object.keys(data["stateData"])
        let values = districtNames.map(districtName => data["stateData"][districtName]["confirmed"])
        let index=districtNames.indexOf("Unknown")
        if(index>0){
            districtNames.splice(index,1)
            values.splice(index,1)
        }
        
        return (
            <div className={"app-plot-container"}>
                <Plot
                    data={[{
                        type: 'bar',
                        x: districtNames,
                        y: values,
                        transforms: [{
                            type: 'sort',
                            target: 'y',
                            order: 'descending'
                        }]

                    },
                    ]} layout={{
                        width: "100%", height: "100%", title: data["stateName"], yaxis: { fixedrange: true },
                        xaxis: { fixedrange: true }
                    }} />
                {unknown!=0?<div>Awaiting details for {unknown} patients</div>:<div></div>}

            </div>

        )

    }
}
