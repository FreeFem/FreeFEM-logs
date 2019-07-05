import React from 'react'
import './Timing.css'

import Loading from '../base/Loading'

class Timing extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	displayFunctions() {
		return (
			<div className="function">
				{Object.values(this.props.timing).map(func =>
					<div>
						<div>function: {func.value}</div>
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
				{Object.values(obj.times).map(time =>
					<div>time: {time.value}</div>
				)}
			</div>
		)
	}

	render() {
		return (
			<div>
				<Loading status={this.props.status} />
				<div>{'Total functions: '+this.props.timing.length}</div>
				<p></p>
				{this.displayFunctions()}
			</div>
		)
	}
}

export default Timing
