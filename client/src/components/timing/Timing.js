import React from 'react'
import './Timing.css'

import Loading from '../base/Loading'
import Graph from '../base/Graph'

class Timing extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	displayTypes(obj) {
		if (!obj.types)
			return null
		return (
			<div className="type">
				{Object.values(obj.types).map((type, index) =>
				<div key={index}>
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
				{Object.values(obj.parameters).map((parameter, index) =>
					<div key={index}>
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
				{Object.values(obj.times).map((timeValues, index) =>
					<Graph width="1000" height="50" data={timeValues} stepX="50" key={index}/>
				)}
			</div>
		)
	}

	displayHeader() {
		if (!this.props.timing || !this.props.timing.functions)
			return null
		return (
			<h3 className="header">
				<div>{'Functions found: '+Object.keys(this.props.timing.functions).length}</div>
			</h3>
		)
	}

	displayContent() {
		if (!this.props.timing || !this.props.timing.functions)
			return null
		return (
			<div className="content">
				{Object.entries(this.props.timing.functions).map(([funcName, func]) =>
					<div className="function" key={funcName}>
						<div>function: {funcName}</div>
						{this.displayTypes(func)}
						{this.displayParameters(func)}
						{this.displayTimes(func)}
					</div>
				)}
			</div>
		)
	}

	render() {
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
