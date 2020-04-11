import Plot from 'react-plotly.js'
import React, {PureComponent} from "react";


export default class StateChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    render(){
        let {data} = this.props;
        let cityNames=Object.keys(data["stateData"])
        
        let values=cityNames.map(cityName=>data["stateData"][cityName])
        return(
        <div className={"plot-cotainer"}>
            <Plot
              data={[{type: 'bar', x: cityNames, y:values},
              ]} layout={{width: "100%", height: "100%", title: data["stateName"]}}/>
        </div>  
        
        )
        
    } 
} 