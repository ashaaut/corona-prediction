import React, { Component } from 'react'
import { scaleQuantile } from 'd3-scale'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';


class stateMap extends Component {
  constructor(props) {
    super(props);
  }
  
  
  render() {

    const { stateTopo } = this.props
    console.log(stateTopo)
    const DEFAULT_COLOR = '#808080';
    // const colorScale = scaleQuantile()
    //   .domain(stateData.map(d => parseInt(d.confirmed)))
    //   .range(COLOR_RANGE);

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
        <div className="statemap">

      <ComposableMap
        projectionConfig={PROJECTION_CONFIG}
        projection="geoMercator"
        width={600}
        height={220}
        data-tip=""
      >
        <Geographies geography={stateTopo}>
          {({ geographies }) =>
            geographies.map(geo => {
            //   let newId = this.getStateId(geo.id)
            //   const current = stateData.filter(s => s["statecode"] == newId);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={style}
                //   fill={current[0] ? colorScale(current[0].confirmed) : DEFAULT_COLOR}

                //   onMouseEnter={() => onMouseEnter(geo, current)}
                //   onMouseLeave={() => onMouseLeave()}
                //   onClick={()=>onclick(geo)}

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

export default stateMap
