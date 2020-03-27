
import React from "react";
import { hot } from 'react-hot-loader/root';
import CoronaDataTable from "./coronaSpreadMap/coronaDataTable";

class App extends React.Component {
  render() {
    const { name } = this.props;
    return <div>
        <CoronaDataTable/>
    </div>;
  }
}

export default hot(App);
