import React, {PureComponent} from "react";
// import Graph from "react-graph-vis";
import data from "../../data/data.json"


export default class CoronaDataTable extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            
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

    furtherBreakDown(d) {
        return <div className={"key-value-container-lower"}>
            {Object.keys(d).map(k => <div className={"patient-key-value-lower"}>
                <div className={"patient-key-lower"}>{k}</div>
                <div className={"patient-value-lower"}>{typeof (d[k]) == "object" ? this.furtherBreakDown(d[k]) : d[k]}</div>
            </div>)}
        </div>
    }

    createRawPatientDataRow(d) {
        return <div className={"key-value-container"}>
            {Object.keys(d).map(k => <div className={"patient-key-value"}>
                <div className={"patient-key"}>{k}</div>
                <div className={"patient-value"}>{typeof (d[k]) == "object" ? this.furtherBreakDown(d[k]) : d[k]}</div>
            </div>)}
        </div>
    }

    render() {
        const {data}=this.props
        const rawPatientData=data["rawPatientData"]
        return <div className={"raw-patient-data"}>
            {rawPatientData ?
              rawPatientData.map(d => {
                  return d
              }) : "Data not available"}
        </div>
    }
}

