import React from 'react'
import './Coverage.css'

import { Link } from 'react-router-dom'

import Loading from '../base/Loading'

//Warning: page does not reload after fetch!

import { COVERAGE_URL, COVERAGE_NAME } from '../../config/Config'

function lineCoverage(obj) {
	return (
		<div className="value-row">
			<div className="value">{obj.linesCovered}%</div>
			<div className="value">{obj.nbLinesHit} / {obj.nbLines}</div>
		</div>
	)
}

function functionCoverage(obj) {
	return (
		<div className="value-row">
			<div className="value">{obj.functionsCovered}%</div>
			<div className="value">{obj.nbFunctionsHit} / {obj.nbFunctions}</div>
		</div>
	)
}

class Coverage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		const currentURL = this.props.location.pathname
		let path = currentURL.split('/')
		path = path.filter(e => e !== '')
		
		let navView
		let test = 'FreeFEM - unit tests'
		let date = 'temp'
		let legend

		let coverageContent
		let content
		let viewedObject
		
		if (path.length === 1) {
			const directories = this.props.coverage.directories
			if (!directories)
				return null
			navView =
				<div className="previous">
					{COVERAGE_NAME}
				</div>
			content =
				Object.entries(directories).map(([dirName, dir]) =>
					<div key={dirName}>
						<div><Link to={COVERAGE_URL+'/'+dirName} key={dirName}>{dirName}</Link></div>
						{lineCoverage(dir)}
						{functionCoverage(dir)}
					</div>)
			viewedObject = this.props.coverage
		}
		else if (path.length === 3) {
			const directory = path[1]+'/'+path[2]
			if (!this.props.coverage.directories[directory])
				return null
			const files = this.props.coverage.directories[directory].files
			navView =
				<div className="previous">
					<Link to={COVERAGE_URL}>
						{COVERAGE_NAME}
					</Link>
					&lt; {directory}
				</div>
			content =
				Object.entries(files).map(([fileName, file]) =>
					<div key={fileName}>
						<div><Link to={COVERAGE_URL+'/'+directory+'/'+fileName} key={fileName}>{fileName}</Link></div>
						{lineCoverage(file)}
						{functionCoverage(file)}
					</div>)
			viewedObject = this.props.coverage.directories[directory]
		}
		else if (path.length === 4) {
			const directory = path[1]+'/'+path[2]
			if (!this.props.coverage.directories[directory])
				return null
			const file = path[3]
			const fileContent = this.props.coverage.directories[directory].files[file]
			if (!fileContent)
				return null
			navView =
				<div className="previous">
					<Link to={COVERAGE_URL}>
						&lt; {COVERAGE_NAME}
					</Link>
					<Link to={COVERAGE_URL+'/'+directory}>
						&lt; {directory}
					</Link>
					&lt; {file}
				</div>
			content =
				<pre><code>code</code></pre>
			viewedObject = this.props.coverage.directories[directory].files[file]
		}
		else {
			navView =
				<div className="previous">
					<Link to={COVERAGE_URL}>
						&lt; {COVERAGE_NAME}
					</Link>
				</div>
		}

		if (path.length === 4) {
			legend = 'Lines: hit not hit'
			coverageContent =
				<div className="coverage-codeview">
					<div className="coverage-codeview-header">
						<div></div>
						<div>Line data</div>
						<div>Source code</div>
					</div>
					<div className="content">source code...</div>
				</div>
		}
		else {
			legend = 'Rating: low: < 65% | medium: >= 65% | high: >= 80 %'
			coverageContent =
				<div className="coverage-listview">
					<div>
						<div className="header">Directory</div>
						<div className="header">Line Coverage</div>
						<div className="header">Functions</div>
					</div>
					{content}
				</div>
		}

		return (
			<div className="Coverage">
				<Loading status={this.props.status} />

				<div className="coverage-summary">
					<div className="table-info">
						<div className="label">Current view:</div>
						<div>{navView}</div>

						<div className="label">Test:</div>
						<div>{test}</div>

						<div className="label">Date:</div>
						<div>{date}</div>

						<div className="label">Legend:</div>
						<div>{legend}</div>
					</div>

					<div className="table-summary">
						<div className="header"></div>
						<div className="header">Hit</div>
						<div className="header">Total</div>
						<div className="header">Coverage</div>

						<div className="label">Lines:</div>
						<div className="value">{viewedObject.nbLinesHit}</div>
						<div className="value">{viewedObject.nbLines}</div>
						<div className="value">{viewedObject.linesCovered}%</div>

						<div className="label">Functions:</div>
						<div className="value">{viewedObject.nbFunctionsHit}</div>
						<div className="value">{viewedObject.nbFunctions}</div>
						<div className="value">{viewedObject.functionsCovered}%</div>
					</div>
				</div>

				{coverageContent}

			</div>
		)
	}
}

export default Coverage
