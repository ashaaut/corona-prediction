import React, { Component,useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import data from './../../data/indiaMapData.json'
import ReactTooltip from "react-tooltip";

class IndiaMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      geoStateName: ""
    }

  }
  onMouseEnter(geo) {
    this.setState({
      geoStateName: geo.properties.name
    });
  };
  onMouseLeave() {
    this.setState({
      geoStateName: ""
    });
  };

  render() {
  
    const PROJECTION_CONFIG = {
      scale: 350,
      center: [78.9629, 20.5937]
    };

    let style={
      default: {
        fill: '#808080',
        outline: "none"
      },
      hover: {
        fill: "#F53",
        outline: "none"
      },
      pressed: {
        fill: "#E42",
        outline: "none"
      }
    }


    return (
      <div>
        
    <ReactTooltip>{this.state.geoStateName}</ReactTooltip>
        <ComposableMap
          projectionConfig={PROJECTION_CONFIG}
          projection="geoMercator"
          width={600}
          height={220}
         
          data-tip=""
          >
          <Geographies geography={data}>
            {({ geographies }) =>
              geographies.map(geo => {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={style}
                    onMouseEnter={() => this.onMouseEnter(geo)}
                    onMouseLeave={() => this.onMouseLeave()}
                  
                  />
                );
              })
            }
          </Geographies>

        </ComposableMap>
      
      </div>

    )

  }
}


export default IndiaMap;
