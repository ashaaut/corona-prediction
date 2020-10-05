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
        let monthNumber = { January: 1, February: 2, March: 3, April: 4, May: 5,June:6,July:7,August:8,September:9,October:10,Novenmber:11,December:12 }
        let year = "2020"
        let reqDate = new Date([year, monthNumber[month], day].join("-"));
        return reqDate
    }
     
    render() {
        let {data}=this.props
        // console.log("date")
        // console.log(data)
        let rawData=data["cases_time_series"]
  
        return (
            <div>
                <div className={"main-title"}> Date Specific Charts</div>
                <div className="warning-div">! Warning: Data Not In Sync</div>
                <div className={"multiple-chart-sideway"}>
                    <div className={"multiple-chart-updown"}>
                        <div className={"chart-title"}> Incremental Line Charts</div>
                        <div>
                            <IncrementalLineChart data={rawData} changeFormat={this.changeFormat}/> 
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