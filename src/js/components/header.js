import React, { Component } from "react";

export default class Header extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        const { navigateChart, selectedButton } = this.props;
        return (
            <div className="header shadow">
                <div className="web-title"> Corona Visualizer</div>
                <div className={"button-container"}>
                    <button onClick={() => navigateChart("india")}
                        className={selectedButton === "india" ? "selected" : ""}>India Overview
                  </button>
                    <button id="test-state-data" onClick={() => navigateChart("state")}
                        className={selectedButton === "state" ? "selected" : ""}>State Data
                  </button>
                    <button id="test-general-dist" onClick={() => navigateChart("generalDist")}
                        className={selectedButton === "generalDist" ? "selected" : ""}>General Dist.
                  </button>
                </div>
            </div>
        );
    }
}
