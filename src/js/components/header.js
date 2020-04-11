import React, { Component } from "react";
import logo from "./../../assets/images/Corona.png";


export default class Header extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        return (
            <div className="header shadow">
                {/* <div className="header-logo"> */}
                {/* <a href="/"><img className="logo" src={logo}/> </a> */}
                <div className="web-title"> Corona Visualizer</div>

                <div classname={"button-container"}>
                    <div className={"buttons"}>
                        <button onClick={() => this.props.changeChart("india")} className="button">India Overview</button>
                        <button onClick={() => this.props.changeChart("state")} className="button">State Data</button>
                        <div class="dropdown">
                            <button className="button" >general Distribution</button>
                            <div class="dropdown-content">
                                <a onClick={() => this.props.changeChart("gender")} href="#">Gender Data</a>
                                <a onClick={() => this.props.changeChart("age")} href="#">Age Data</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* </div> */}
            </div>
        );
    }
}
