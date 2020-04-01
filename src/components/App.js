
import React from "react";
import { hot } from 'react-hot-loader/root';
import CoronaMap from "./coronaSpreadMap/coronaMap"
import data from "./../data/data.json"

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      data:data.data
    }
  } 

  render() {
    const { name } = this.props;
    return <div>
        <CoronaMap data={this.state.data}/>
        
    </div>;
  }
}

export default hot(App);
