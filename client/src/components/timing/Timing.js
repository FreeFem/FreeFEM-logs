import React from 'react'
import './Timing.css'

import Loading from '../base/Loading'
import Graph from '../base/Graph';

class Timing extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	displayFunctions(timing) {
		if (!timing)
			return null
		return (
			<div className="function">
				{Object.entries(timing).map(([funcName, func]) =>
					<div>
						<div>function: {funcName}</div>
						{this.displayTypes(func)}
						{this.displayParameters(func)}
						{this.displayTimes(func)}
					</div>
				)}
			</div>
		)
	}

	displayTypes(obj) {
		if (!obj.types)
			return null
		return (
			<div className="type">
				{Object.values(obj.types).map(type =>
				<div>
					<div>type: {type.value}</div>
					{this.displayTimes(type)}
				</div>
				)}
			</div>
		)
	}

	displayParameters(obj) {
		if (!obj.parameters)
			return null
		return (
			<div className="parameter">
				{Object.values(obj.parameters).map(parameter =>
					<div>
						<div>parameter: {parameter.value}</div>
						{this.displayTimes(parameter)}
					</div>
				)}
			</div>
		)
	}

	displayTimes(obj) {
		if (!obj.times)
			return null
		return (
			<div className="time">
				{Object.values(obj.times).map(timeValues =>
					<Graph width="1000" height="30" data={timeValues} stepX="50"/>
				)}
			</div>
		)
	}

	render() {
		return (
			<div className="Timing">
				<h2 className="header">{'Functions found: '+Object.keys(this.props.timing).length}</h2>
				<Loading status={this.props.status} />
				<div className="content">
					{this.displayFunctions(this.props.timing)}
				</div>
			</div>
		)
	}
}

export default Timing
