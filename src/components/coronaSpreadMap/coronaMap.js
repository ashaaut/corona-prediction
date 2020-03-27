import React, {PureComponent} from "react";
// import Graph from "react-graph-vis";
import data from "../../data/data.json"
import "../../assets/style/coronaMap.css"


export default class CoronaMap extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: data.data
        };
    }

    // componentWillMount() {
    //     fetch('https://api.rootnet.in/covid19-in/unofficial/covid19india.org', {
    //         cors: 'no-cors',
    //         method: 'GET',
    //         redirect: 'follow',
    //     })
    //       .then(resp => resp.json())
    //       .then(res => {
    //           this.setState({data: res.data})
    //       })
    //       .catch(err => console.log('error', err))
    // }

    createRawPatientDataRow(d) {
        return <div className={"keyValueContainer"}>
            {Object.keys(d).map(k => <div className={"patient-key-value"}>
                <div className={"patient-key"}>{k}</div>
                <div className={"patient-value"}>{typeof (d[k]) == "object" ? JSON.stringify() : d[k]}</div>
            </div>)}
        </div>
    }

    render() {
        let rawPatientData = this.state.data['rawPatientData'];
        return <div className={"rawPatientData"}>
            {rawPatientData ?
              rawPatientData.map(d => {
                  return this.createRawPatientDataRow(d)
              }) : "Data not available"}
        </div>
    }
}

