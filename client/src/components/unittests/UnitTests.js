import React from 'react'
import './UnitTests.css'

import Loading from '../base/Loading'

class UnitTests extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	displayHeader() {
		if (!this.props.unitLogs)
			return null
		return (
			<div className="header">
				<div className="item">Successful tests: </div>
				<div className="value">{this.props.unitLogs.validUnitTests+' / '+this.props.unitLogs.totalUnitTests}</div>
			</div>
		)
	}

	displayContent() {
		if (!this.props.unitLogs || !this.props.unitLogs.failedTests)
			return null
		return (
			<div className="content">
				<div>Failed tests: </div>
				<div className="test-list">
					{Object.values(this.props.unitLogs.failedTests).map((test, index) =>
						<div className="test-item" key={index}>{test}</div>
					)}
				</div>
			</div>
		)
	}

	render() {
		return (
			<div className="UnitTests">
				<Loading status={this.props.status} />
				{this.displayHeader()}
				{this.displayContent()}
			</div>
		)
	}
}

export default UnitTests
