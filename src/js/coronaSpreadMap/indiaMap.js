import React, { Component } from 'react';
import ReactTooltip from "react-tooltip";
import MapChart from './mapChart'
import ColorScale from './colorScale'


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
        Deaths:${current[0]["deaths"]} ,
        LastUpdated:${current[0]["lastupdatedtime"]} `
        
    });
  };

  onMouseLeave() {
    this.setState({
      geoStateData: ""
    })
  };


  render() {
    const { stateData } = this.props
    // delete stateData[0]
    const COLOR_RANGE = [
      '#ffedea',
      '#ffcec5',
      '#ffad9f',
      '#ff8a75',
      '#ff5533',
      '#e2492d',
      '#be3d26',
      '#9a311f',
      '#782618'
    ];
    const gradientData = {
      fromColor: COLOR_RANGE[0],
      toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
      min: 0,
      max: stateData.reduce((max, item) => (parseInt(item.confirmed) > max ? item.confirmed : max), 0)
    };

    return (
      <div className="app-plot-container india-map">
        <div className={"chart-title"}>Choropleth Map</div>

        <ReactTooltip classname="tooltip" multiline={true}>
          {this.state.geoStateData}
        </ReactTooltip>
        <MapChart onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} stateData={stateData} COLOR_RANGE={COLOR_RANGE} />
        <ColorScale data={gradientData} />
      </div>

    )

  }
}


export default IndiaMap;
