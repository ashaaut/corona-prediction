import React from "react";
import ReactDOM from "react-dom";
import App from "./../src/js/components/App"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/style/main.scss";


var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);