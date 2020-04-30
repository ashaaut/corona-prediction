import React, { Component } from 'react'
import { scaleQuantile } from 'd3-scale'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import data from './../../data/indiaMapData.json'
class MapChart extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    const { onMouseEnter, onMouseLeave, stateData } = this.props
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
    const DEFAULT_COLOR = '#808080';
    const colorScale = scaleQuantile()
      .domain(stateData.map(d => parseInt(d.confirmed)))
      .range(COLOR_RANGE);

    const PROJECTION_CONFIG = {
      scale: 350,
      center: [78.9629, 20.5937]
    };

    let style = {
      default: {
        outline: 'none'
      },
      hover: {
        transition: 'all 250ms',
        outline: 'none',
        stroke: "#FF6347",
        strokeWidth: 1.5,
      },
      pressed: {
        outline: 'none'
      }
    };
    return (
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
              console.log(geo.id)
              console.log(stateData.map(s=>s["statecode"]))
              const current = stateData.filter(statedata => statedata["statecode"] == geo.id);

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={style}
                  fill={current[0] ? colorScale(current[0].confirmed) : DEFAULT_COLOR}
                
                  onMouseEnter={() => onMouseEnter(geo, current)}
                  onMouseLeave={() => onMouseLeave()}

                />
              );
            })
          }
        </Geographies>

      </ComposableMap>

    )
  }
}

export default MapChart