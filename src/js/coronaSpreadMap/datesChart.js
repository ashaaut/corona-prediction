import React, { PureComponent } from 'react';
import LineChart from './directLineChart';
import IncrementalLineChart from './incrementalLineChart';

export default class DateChart extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	changeFormat(date) {
		let dateList = date.split('-');
		let day = dateList[2];
		let month = dateList[1];
		let year = dateList[0];
		let reqDate = new Date([year, month, day].join('-'));
		return reqDate;
	}

	render() {
		let { data } = this.props;

		let rawData = data['cases_time_series'];

		return (
			<div>
				<div className={'main-title'}> Date Specific Charts</div>

				{/* <div className={"multiple-chart-updown"}> */}
				<div className={'chart-title'}> Incremental Line Charts</div>
				<div>
					<IncrementalLineChart
						data={rawData}
						changeFormat={this.changeFormat}
					/>
				</div>
				{/* </div> */}
				{/* <div className={"multiple-chart-updown"}> */}
				<div className={'chart-title'}> Date Patients Count</div>
				<div>
					<LineChart data={rawData} changeFormat={this.changeFormat} />

					{/* </div> */}
				</div>
			</div>
		);
	}
}
