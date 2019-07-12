import React from 'react'
import './UnitTests.css'

import Loading from '../base/Loading'

const gitUnitTestsRepo = 'https://github.com/FreeFem/FreeFem-sources/tree/feature-unittests/unit/'

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
		if (!this.props.unitLogs || !this.props.unitLogs.failedUnitTests || !this.props.unitLogs.failedPaths)
			return null
		return (
			<div className="content">
				<div className="title">Failed tests: ({this.props.unitLogs.failedUnitTests})</div>
				{Object.entries(this.props.unitLogs.failedPaths).map(([dirName, dir]) =>
					<div className="directory" key={dirName}>
						<div className="name">{dirName}</div>
						<div className="files">
							{Object.values(dir).map(file =>
								<div key={file}>
									<a target="_blank" rel="noopener noreferrer" href={gitUnitTestsRepo+file}>{file.split('/').pop()}</a>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		)
	}

	render() {
		return (
			<div className="UnitTests">
				{this.displayHeader()}
				<Loading status={this.props.status} />
				{this.displayContent()}
			</div>
		)
	}
}

export default UnitTests
