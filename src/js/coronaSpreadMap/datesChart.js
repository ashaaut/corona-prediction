import React, { PureComponent } from "react";
import LineChart from './directLineChart'
import IncrementalLineChart from './incrementalLineChart'


export default class DateChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
        
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
        let {data}=this.props
        let rawData=data["cases_time_series"]
  
        return (
            <div>
                <div className={"main-title"}> Date specific Charts</div>
                <div className={"multiple-chart-sideway"}>
                    <div className={"multiple-chart-updown"}>
                        <div className={"chart-title"}> Incremental line charts</div>
                        <div>
                            <IncrementalLineChart data={rawData} changeFormat={this.changeFormat} /> 
                        </div>
                    </div>
                    <div className={"multiple-chart-updown"}>
                        <div className={"chart-title"}> Date Patients Count</div>
                        <div>
                            <LineChart data={rawData} changeFormat={this.changeFormat} /> 

                        </div>
                    </div>


                </div>

            </div>

        )

    }

}