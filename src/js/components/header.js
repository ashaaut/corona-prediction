import React, {Component} from "react";
import logo from "./../../assets/images/Corona.png";


export default class Header extends Component {
    render() {
        return (
          <div className="header shadow">
              <div className="header-logo">
                  <a href="/"><img className="logo" src={logo}/> </a>
                  <div className="web-title"> Corona Visuliazer</div>
              </div>
              
          </div>
        );
    }
}
