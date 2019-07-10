import React from 'react'
import './UnitTests.css'

import Loading from '../base/Loading'

class UnitTests extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	displayHeader() {
		if (!this.props.unitlogs)
			return null
		return (
			<div className="header">
				<div className="item">Successful tests: </div>
				<div className="value">{this.props.unitlogs.validUnitTests+' / '+this.props.unitlogs.totalUnitTests}</div>
			</div>
		)
	}

	displayContent() {
		if (!this.props.unitlogs || !this.props.unitlogs.failedTests)
			return null
		return (
			<div className="content">
				<div className>Failed tests: </div>
				<div className="test-list">
					{Object.values(this.props.unitlogs.failedTests).map(test =>
						<div className="test-item">{test}</div>
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
