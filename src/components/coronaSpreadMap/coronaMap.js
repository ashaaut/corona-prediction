import React, {PureComponent} from "react";
// import Graph from "react-graph-vis";
import data from "../../data/data.json"


export default class CoronaMap extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: data.data
        };
    }
}

