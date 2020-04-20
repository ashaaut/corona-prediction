import React, { PureComponent } from "react";
import GenderChart from "./genderChart";
import AgeChart from "./ageChart";


export default class GeneralDist extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: undefined
        };
    }

    componentWillMount() {
        fetch('https://api.covid19india.org/raw_data.json', {
            cors: 'no-cors',
            method: 'GET',
            redirect: 'follow',
        })
            .then(resp => resp.json())
            .then(res => {
                this.setState({ data: res })
            })
            .catch(err => console.log('error', err))
    }
    render() {
        if (!this.state.data) {
            return <div className={"data-loading"}> Loading Data...... </div>
        }
        return (
            <div className={"specific-chart-container"}>
                <div className={"main-title"}> General Distribution</div>
                <GenderChart data={this.state.data} />
                <AgeChart data={this.state.data} />
            </div>
        )

    }
} 