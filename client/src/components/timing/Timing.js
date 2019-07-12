import React from 'react'
import './Timing.css'

import Loading from '../base/Loading'
import Graph from '../base/Graph'

class Timing extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			minTimeDelta: 0,
			maxTimeDelta: Infinity
		}
	}

	displayTypes(obj) {
		if (!obj.types)
			return null
		return (
			Object.values(obj.types).map((type, index) =>
				<div className="type" key={index}>
					<div>type: {type.value}</div>
					{this.displayTimes(type)}
				</div>
			)
		)
	}

	displayParameters(obj) {
		if (!obj.parameters)
			return null
		return (
			Object.values(obj.parameters).map((parameter, index) =>
				<div className="parameter" key={index}>
					<div>parameter: {parameter.value}</div>
					{this.displayTimes(parameter)}
				</div>
			)
		)
	}

	displayTimes(obj) {
		if (!obj.times)
			return null
		return (
			<div className="times">
				{Object.values(obj.times).map((timeValues, index) =>
					<Graph width="1000" height="50" data={timeValues} stepX="50" key={index}/>
				)}
			</div>
		)
	}

	setMinDeltaTime(event) {
		var val = event.target.value ? event.target.value : 0
		if (val < 0)
			val = this.state.minTimeDelta
		this.setState({minTimeDelta: val})
	}

	setMaxDeltaTime(event) {
		var val = event.target.value ? event.target.value : Infinity
		if (val < 0 || val < this.state.minTimeDelta)
			val = this.state.maxTimeDelta
		this.setState({maxTimeDelta: val})
	}

	displayHeader() {
		if (!this.props.timing || !this.props.timing.functions)
			return null
		return (
			<div className="header">
				<div className="search-bar">
					<div>Filter by time delta</div>
					<input
						placeholder="min"
						type="number"
						name="minTimeDelta"
						onChange={this.setMinDeltaTime.bind(this)}
					/>
					<input
						placeholder="max"
						type="number"
						name="maxTimeDelta"
						onChange={this.setMaxDeltaTime.bind(this)}
					/>
				</div>
				<div className="grid">
					<div className="item">Functions found:</div>
					<div className="value">{Object.values(this.props.timing.functions)
						.filter(func => func.maxTimeDelta >= this.state.minTimeDelta && func.maxTimeDelta <= this.state.maxTimeDelta).length}</div>
				</div>
			</div>
		)
	}

	displayContent() {
		if (!this.props.timing || !this.props.timing.functions)
			return null
		return (
			<div className="content">
				{Object.entries(this.props.timing.functions)
				.filter(([funcName, func]) => func.maxTimeDelta >= this.state.minTimeDelta && func.maxTimeDelta <= this.state.maxTimeDelta)
				.map(([funcName, func]) =>
					<div className="function" key={funcName}>
						<div>function: {funcName} | max time delta {func.maxTimeDelta}</div>
						{this.displayTypes(func)}
						{this.displayParameters(func)}
						{this.displayTimes(func)}
					</div>
				)}
			</div>
		)
	}

	render() {
		if (this.props.timing.timingReports)
			console.log(this.props.timing.timingReports)
		return (
			<div className="Timing">
				<Loading status={this.props.status} />
				{this.displayHeader()}
				{this.displayContent()}
			</div>
		)
	}
}

export default Timing
