import React, { PureComponent } from "react";
// import DateChart from './datesChart'
import IndiaChart from './indiaChart'
import IndiaMap from './indiaMap'

export default class IndiaData extends PureComponent {
    constructor() {
        super();
        this.state = {
            
            stateAndStatusData: undefined,
            selected: "Map",
            
        };
    }

    componentWillMount() {
        fetch('https://api.covid19india.org/data.json', {
            cors: 'no-cors',
            method: 'GET',
            redirect: 'follow',
        })
            .then(resp => resp.json())
            .then(res => {
                this.setState({ stateAndStatusData: res })
            })
            .catch(err => console.log('error', err))
    }
    changeSelected(e) {
        this.setState({  stateAndStatusData:this.state.stateAndStatusData,selected: e.target.value})
    }

    render() {
        if (!this.state.stateAndStatusData) {
            return <div className={"data-loading"}> Loading Data...... </div>
        }
        const data = this.state.stateAndStatusData;
        let stateData = data['statewise'];
        let total = stateData["0"]
        return (
            <div className={"specific-chart-container"}>

                <div className={"main-title"}> India Overview</div>
                <div className={"total-count-div"}>
                    <div className={" count-div confirmed-color"}>
                        <div>Total Confirmed</div>
                        <div>{total["confirmed"]}</div>
                    </div>
                    <div className={"count-div active-color"}>
                        <div>Total Active</div>
                        <div>{total["active"]}</div>
                    </div>
                    <div className={" count-div recovered-color"}>
                        <div>Total Recovered</div>
                        <div>{total["recovered"]}</div>
                    </div>
                    <div className={"count-div deaths-color"}>
                        <div>Total Deaths</div>
                        <div>{total["deaths"]}</div>
                    </div>
                </div>
                <div className={"chart-selector-container"}>
                    <div className={"chart-selector"}>
                
                <div className={"chart-title"}>Selected Chart</div>
                <select name="select" onChange={(e) => this.changeSelected(e)} value={this.state.selected}>
                    <option value="Map">Map</option>
                    <option value="Bar Chart">Bar Chart</option>
                </select>
                </div>
                </div>
                {this.state.selected=="Map"?<IndiaMap stateData={stateData}/>:<IndiaChart />
}
                                
                
                {/* <DateChart data={data} /> */}
            </div>

        )

    }
}
