import React, {PureComponent} from "react";
import GenderChart from "./genderChart";
import AgeChart from "./ageChart";


export default class GeneralDist extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let {data} = this.props;
        return (
          <div className={"specific-chart-container"}>
              <div className={"main-title"}> General Distribution</div>
              <GenderChart data={data}/>
              <AgeChart data={data}/>
          </div>
        )

    }
} 