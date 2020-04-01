import React, {PureComponent} from "react";
// import Graph from "react-graph-vis";
import Plot from 'react-plotly.js'


export default class CoronaMap extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            
        };
            
    }
    filterGenderData(rawPatientData,key,gender){
        return rawPatientData.filter(data=>data[key]===gender)
    }
    render(){
        const {data}=this.props
        let rawPatientData=data["rawPatientData"]
        let males=this.filterGenderData(rawPatientData,"gender","male")
        let females=this.filterGenderData(rawPatientData,"gender","female")
        const coronaData=[
            {
                type:"bar",
                x:["male","female"],
                y:[males.length,females.length],
                name:"A gender distribution"
            }
        ];
        let layout=
            {
                width:"350",
                height:"400",
                title:"A gender distribution"
            }
        return(
            <div>
                <Plot 
                    data={coronaData} layout={layout}
                />
            </div>
            
        );
       
    }
}

