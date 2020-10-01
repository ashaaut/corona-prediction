import React, { PureComponent } from "react";
import StateChart from './stateChart'


export default class AllStateCharts extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selected: "Maharashtra",
            stateData: undefined
        };
    }
    componentWillMount() {
        fetch('https://api.covid19india.org/state_district_wise.json', {
            cors: 'no-cors',
            method: 'GET',
            redirect: 'follow',
        })
            .then(resp => resp.json())
            .then(res => {
                this.setState({ stateData: res })
            })
            .catch(err => console.log('error', err))
    }

    changeSelected(e) {
        this.setState({ selected: e.target.value })
    }

    render() {
        if (!this.state.stateData) {
            return <div className={"data-loading"}> Loading Data...... </div>
        }
        let data = this.state.stateData
        let selectedState = this.state.selected;
        let selectedData = data[selectedState]["districtData"];
        let allStateNames = Object.keys(this.state.stateData)


        return (
            <div className={"specific-chart-container"}>
                <div className={"main-title"}> State Chart</div>
                <div className={"chart-selector-container"}>
                    <div className={"chart-selector"}>
                        <div className={"chart-title"}>Selected Chart</div>
                        <select name="select" onChange={(e) => this.changeSelected(e)} value={this.state.selected}>
                            {allStateNames.map(function (n) {
                                return (<option value={n} key={`option-${n}`}>{n}</option>);
                            })}
                        </select>
                    </div>
                    <div className={"selected-plot-container"}>
                        <StateChart
                            data={{
                                stateName: selectedState,
                                stateData: selectedData
                            }} />
                    </div>
                </div>
            </div>

        )

    }
}