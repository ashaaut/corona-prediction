import React, { PureComponent } from "react";
import LineChart from './directLineChart'
import IncrementalLineChart from './incrementalLineChart'


export default class DateChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: undefined
        };
    }

    fetchData() {
        fetch('https://api.covid19india.org/data.json', {
            cors: 'no-cors',
            method: 'GET',
            redirect: 'follow',
        })
            .then(resp => resp.json())
            .then(res => {
                this.setState({ data: res.cases_time_series })
            })
            .catch(err => console.log('error', err))
    }


    changeFormat(date) {
        let dateList = date.split(" ");
        let day = dateList[0];
        let month = dateList[1];
        let monthNumber = { January: 1, February: 2, March: 3, April: 4, May: 5 }
        let year = "2020"
        let reqDate = new Date([year, monthNumber[month], day].join("-"));
        return reqDate
    }

    render() {
        if (!this.state.data) {
            this.fetchData()
        }
        return (
            <div>
                <div className={"main-title"}> Date specific Charts</div>
                <div className={"multiple-chart-sideway"}>
                    <div className={"multiple-chart-updown"}>
                        <div className={"chart-title"}> Incremental line charts</div>
                        <div>
                            {this.state.data ? <IncrementalLineChart data={this.state.data} changeFormat={this.changeFormat} /> : <div className={"data-loading"}> Loading Data...... </div>}

                        </div>
                    </div>
                    <div className={"multiple-chart-updown"}>
                        <div className={"chart-title"}> Date Patients Count</div>
                        <div>
                            {this.state.data ? <LineChart data={this.state.data} changeFormat={this.changeFormat} /> : <div className={"data-loading"}> Loading Data...... </div>}

                        </div>
                    </div>


                </div>

            </div>

        )

    }

}