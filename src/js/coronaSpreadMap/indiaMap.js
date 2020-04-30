import React, { Component } from 'react';
import ReactTooltip from "react-tooltip";
import MapChart from './mapChart'


class IndiaMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      geoStateData: "",
    }
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }

  onMouseEnter(geo, current) {

    this.setState({
      geoStateData: `${geo.properties.name},
        Confirmed:${current[0]['confirmed']},
        Recovered: ${current[0]["recovered"]},
        Deaths:${current[0]["deaths"]} `
    });
  };

  onMouseLeave() {
    this.setState({
      geoStateData: ""
    })
  };


  handleContent(geoStateData) {
    let a = geoStateData.split(",")
    console.log(a)
    return (
      <div>
        {a.map(s =>{s})}
      </div>

    )
  }
  render() {
    const { stateData } = this.props
    return (
      <div className="app-plot-container india-chart">

        <ReactTooltip  classname="tooltip"  multiline={true}>
          {this.state.geoStateData}
          {/* {this.handleContent(this.state.geoStateData)} */}
        </ReactTooltip>
        <MapChart onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} stateData={stateData} />
        
      </div>

    )

  }
}


export default IndiaMap;
