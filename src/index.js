import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./assets/style/main.scss";


var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);