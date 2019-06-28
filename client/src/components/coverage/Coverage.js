import React from 'react'
import './Coverage.css'

class Coverage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			view: 'temp',
			test: 'FreeFEM - unit tests',
			date: 'temp',
			legend: 'Rating: low: < 65% | medium: >= 65% | high: >= 80%',
			linesHit: 0,
			linesTotal: 0,
			linesCovered: 0,
			functionsHit: 0,
			functionsTotal: 0,
			functionsCovered: 0,
			directories: {}
		}
	}

	componentDidMount() {
		this.setValues()
	}

	setValues() {
		this.setState({
			linesHit: this.props.coverage.nbLinesHit,
			linesTotal: this.props.coverage.nbLines,
			linesCovered: this.props.coverage.linesCovered,
			functionsHit: this.props.coverage.nbFunctionsHit,
			functionsTotal: this.props.coverage.nbFunctions,
			functionsCovered: this.props.coverage.functionsCovered,
			directories: this.props.coverage.directories
		})
	}

	directoriesDisplay() {
		if (!this.state.directories)
			return null
		return (
			Object.entries(this.state.directories).map(([dirName, dir]) =>
				<div>
					<div>{dirName}</div>
					<div>{dir.linesCovered}% ({dir.nbLinesHit} / {dir.nbLines})</div>
					<div>{dir.functionsCovered}% ({dir.nbFunctionsHit} / {dir.nbFunctions})</div>
				</div>
			)
		)
	}

	render() {
		return (
			<div className="Coverage">

				<div className="coverage-summary">
					<div className="table-info">
						<div className="header">Current view:</div>
						<div>{this.state.view}</div>

						<div className="header">Test:</div>
						<div>{this.state.test}</div>

						<div className="header">Date:</div>
						<div>{this.state.date}</div>

						<div className="header">Legend:</div>
						<div>{this.state.legend}</div>
					</div>
					<div className="table-summary">
						<div className="header"></div>
						<div className="header">Hit</div>
						<div className="header">Total</div>
						<div className="header">Coverage</div>
						
						<div>Lines</div>
						<div className="value">{this.state.linesHit}</div>
						<div className="value">{this.state.linesTotal}</div>
						<div className="value">{this.state.linesCovered}%</div>

						<div>Functions</div>
						<div className="value">{this.state.functionsHit}</div>
						<div className="value">{this.state.functionsTotal}</div>
						<div className="value">{this.state.functionsCovered}%</div>
					</div>
				</div>

				<div>-</div>

				<div className="table-detail">

					<div>
						<div className="header">Directory</div>
						<div className="header">Line Coverage</div>
						<div className="header">Functions</div>
					</div>

					{this.directoriesDisplay()}
				</div>

			</div>
		)
	}
}

export default Coverage;
