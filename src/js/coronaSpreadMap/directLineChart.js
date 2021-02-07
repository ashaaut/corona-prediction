import Plot from 'react-plotly.js';
import React, { Component } from 'react';
import AlgorithmicChart from './algorithmmicChart';

export default class lineChart extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let { data } = this.props;
		console.log(data);
		let dates = data.map((e) => e['dateymd']);
		console.log('dates', dates);
		// console.log('direct', data);
		let dailyConfirmed = data.map((e) => e['dailyconfirmed']);
		let dailyRecovered = data.map((e) => e['dailyrecovered']);
		let dailyDeceased = data.map((e) => e['dailydeceased']);
		let newdates = dates.map((d) => this.props.changeFormat(d));
		// console.log(newdates);
		while (dailyConfirmed.indexOf('0') !== -1) {
			let index = dailyConfirmed.indexOf('0');
			newdates.splice(index, 1);
			dailyConfirmed.splice(index, 1);
			dailyRecovered.splice(index, 1);
			dailyDeceased.splice(index, 1);
		}
		let lineChartData = [
			{
				type: 'scatter',
				x: newdates,
				y: dailyConfirmed,
				name: 'Confirmed',
				marker: {
					color: 'red',
				},
			},

			{
				type: 'scatter',
				x: newdates,
				y: dailyRecovered,
				name: 'Recovered',
				marker: {
					color: 'green',
				},
			},

			{
				type: 'scatter',
				x: newdates,
				y: dailyDeceased,
				name: 'Deaths',
				marker: {
					color: 'gray',
				},
			},
		];

		return (
			<div>
				<AlgorithmicChart lineChartData={lineChartData} />
			</div>
		);
	}
}
