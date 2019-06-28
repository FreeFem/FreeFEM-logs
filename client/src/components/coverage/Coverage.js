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
			viewedObject: {}
		}
	}

	componentDidMount() {
		this.setState({
			viewedObject: this.props.coverage
		})
	}

	directoriesDisplay() {
		if (!this.state.viewedObject.directories)
			return null
		return (
			Object.entries(this.state.viewedObject.directories).map(([dirName, dir]) =>
				<div key={dirName}>
					<div>{dirName}</div>
					<div className="value">{dir.linesCovered}% ({dir.nbLinesHit} / {dir.nbLines})</div>
					<div className="value">{dir.functionsCovered}% ({dir.nbFunctionsHit} / {dir.nbFunctions})</div>
				</div>
			)
		)
	}

	filesDisplay() {
		if (!this.state.viewedObject.files)
			return null
		return (
			Object.entries(this.state.viewedObject.files).map(([fileName, file]) =>
				<div key={fileName}>
					<div>{fileName}</div>
					<div className="value">{file.linesCovered}% ({file.nbLinesHit} / {file.nbLines})</div>
					<div className="value">{file.functionsCovered}% ({file.nbFunctionsHit} / {file.nbFunctions})</div>
				</div>
			)
		)
	}

	render() {
		return (
			<div className="Coverage">

				<div className="coverage-summary">
					<div className="table-info">
						<div className="label">Current view:</div>
						<div>{this.state.view}</div>

						<div className="label">Test:</div>
						<div>{this.state.test}</div>

						<div className="label">Date:</div>
						<div>{this.state.date}</div>

						<div className="label">Legend:</div>
						<div>{this.state.legend}</div>
					</div>
					<div className="table-summary">
						<div className="header"></div>
						<div className="header">Hit</div>
						<div className="header">Total</div>
						<div className="header">Coverage</div>
						
						<div className="label">Lines:</div>
						<div className="value">{this.state.viewedObject.nbLinesHit}</div>
						<div className="value">{this.state.viewedObject.nbLines}</div>
						<div className="value">{this.state.viewedObject.linesCovered}%</div>

						<div className="label">Functions:</div>
						<div className="value">{this.state.viewedObject.nbFunctionsHit}</div>
						<div className="value">{this.state.viewedObject.nbFunctions}</div>
						<div className="value">{this.state.viewedObject.functionsCovered}%</div>
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
