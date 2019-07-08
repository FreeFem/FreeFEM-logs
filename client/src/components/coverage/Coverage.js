import React from 'react'
import './Coverage.css'

import { Link } from 'react-router-dom'
import { API, COVERAGE_URL, COVERAGE_NAME, COVERAGE_MID_LIMIT, COVERAGE_HI_LIMIT } from '../../config/Config'
import Loading from '../base/Loading'

class Coverage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			contentStatus: 'loading',
			content: ''
		}
	}

	getCoverageClass(val) {
		if (val < COVERAGE_MID_LIMIT) return 'low'
		if (val >= COVERAGE_MID_LIMIT && val < COVERAGE_HI_LIMIT) return 'med'
		if (val >= COVERAGE_HI_LIMIT) return 'hi'
	}

	getLineCoverageClass(line) {
		if (line === undefined)
			return ''
		return (line === 0) ? 'notHit' : 'hit'
	}

	lineCoverage(obj) {
		let covClass = this.getCoverageClass(obj.linesCovered)
		return (
			<div className="row">
				<div className="coverageBar">
					<div className={"coverageProgress "+this.getCoverageClass(obj.linesCovered)} style={{width: Math.round(obj.linesCovered)+'%'}}></div>
				</div>
				<div className={'cell value '+covClass}>{obj.linesCovered}%</div>
				<div className={'cell value '+covClass}>{obj.nbLinesHit} / {obj.nbLines}</div>
			</div>
		)
	}

	functionCoverage(obj) {
		let covClass = this.getCoverageClass(obj.functionsCovered)
		return (
			<div className="row">
				<div className="coverageBar">
					<div className={"coverageProgress "+this.getCoverageClass(obj.functionsCovered)} style={{width: Math.round(obj.functionsCovered)+'%'}}></div>
				</div>
				<div className={'cell value '+covClass}>{obj.functionsCovered}%</div>
				<div className={'cell value '+covClass}>{obj.nbFunctionsHit} / {obj.nbFunctions}</div>
			</div>
		)
	}

	buildLineContent(input, file) {
		var lines = input.split(/(?:\r\n|\r|\n)/g);
		return Object.entries(lines).map(([index, element]) =>
			<div className="row" key={Number(index)+1}>
				<div className="lineNumber">{Number(index)+1}</div>
				<div className={"lineData "+this.getLineCoverageClass(file.lines[Number(index)+1])}>
					{(file.lines[Number(index)+1] === undefined ? '' : file.lines[Number(index)+1]) + ' :'}
				</div>
				<div>
					<span className={this.getLineCoverageClass(file.lines[Number(index)+1])}>
						{element}
					</span>
				</div>
			</div>
		)
	}

	componentDidUpdate(prevProps) {
		const currentURL = this.props.location.pathname
		let path = currentURL.split('/')
		path = path.filter(e => e !== '')

		// if not viewing a source code file
		if (path.length !== 4)
			return

		// if props not received yet
		if (!this.props.coverage.directories)
			return

		// if source code already loaded
		if (this.props.location.pathname === prevProps.location.pathname && this.state.contentStatus !== 'loading')
			return

		const directory = path[1]+'/'+path[2]
		const file = path[3]
		const viewedObject = this.props.coverage.directories[directory].files[file]

		fetch(API+'getSourceCode', {
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				path: path[1]+'/'+path[2]+'/'+path[3]
			})
		})
		.then(res => res.text())
		.then(res => this.buildLineContent(res, viewedObject))
		.then(res => this.setState({
			contentStatus: 'loaded',
			content: res
		}))
	}

	renderCoverage(navView, test, date, legend, viewedObject, coverageContent) {
		if (!viewedObject)
			return (
				<div>
					<div>Nothing found here</div>
					<Link to={COVERAGE_URL}>{'<-- Back to coverage'}</Link>
				</div>
			)
		return (
			<div className="Coverage">
				<Loading status={this.props.status} />

				<div className="coverage-summary">
					<div className="table-info">
						<div className="label cell">Current view:</div>
						<div className="cell">{navView}</div>

						<div className="label cell">Test:</div>
						<div className="cell">{test}</div>

						<div className="label cell">Date:</div>
						<div className="cell">{date}</div>

						<div className="label cell">Legend:</div>
						<div className="cell">{legend}</div>
					</div>

					<div className="table-summary">
						<div className="header cell"></div>
						<div className="header cell">Hit</div>
						<div className="header cell">Total</div>
						<div className="header cell">Coverage</div>

						<div className="label cell">Lines:</div>
						<div className="value cell">{viewedObject.nbLinesHit}</div>
						<div className="value cell">{viewedObject.nbLines}</div>
						<div className={"value cell "+this.getCoverageClass(viewedObject.linesCovered)}>{viewedObject.linesCovered}%</div>

						<div className="label cell">Functions:</div>
						<div className="value cell">{viewedObject.nbFunctionsHit}</div>
						<div className="value cell">{viewedObject.nbFunctions}</div>
						<div className={"value cell "+this.getCoverageClass(viewedObject.linesCovered)}>{viewedObject.functionsCovered}%</div>
					</div>
				</div>

				{coverageContent}

			</div>
		)
	}

	render() {
		const currentURL = this.props.location.pathname
		let path = currentURL.split('/')
		path = path.filter(e => e !== '')

		let navView
		let test = 'FreeFEM - unit tests'
		let date = this.props.coverage.date
		let legend

		let coverageContent
		let content
		let viewedObject

		if (!this.props.coverage || !this.props.coverage.directories)
			return null

		if (path.length === 1) {
			const directories = this.props.coverage.directories
			navView =
				<div className="previous">
					{COVERAGE_NAME}
				</div>
			//([A, dirA], [B, dirB]) => dirA.linesCovered-dirB.linesCovered
			content =
				Object.entries(directories).sort().map(([dirName, dir]) =>
					<div key={dirName}>
						<div className="cell"><Link to={COVERAGE_URL+'/'+dirName} key={dirName}>{dirName}</Link></div>
						{this.lineCoverage(dir)}
						{this.functionCoverage(dir)}
					</div>)
			viewedObject = this.props.coverage
		}
		else if (path.length === 3) {
			const directory = path[1]+'/'+path[2]
			const files = this.props.coverage.directories[directory].files
			navView =
				<div className="previous">
					<Link to={COVERAGE_URL}>
						{COVERAGE_NAME}
					</Link>
					{' < '+directory}
				</div>
			content =
				Object.entries(files).sort().map(([fileName, file]) =>
					<div key={fileName}>
						<div className="cell"><Link to={COVERAGE_URL+'/'+directory+'/'+fileName} key={fileName}>{fileName}</Link></div>
						{this.lineCoverage(file)}
						{this.functionCoverage(file)}
					</div>)
			viewedObject = this.props.coverage.directories[directory]
		}
		else if (path.length === 4) {
			const directory = path[1]+'/'+path[2]
			const file = path[3]
			navView =
				<div className="previous">
					<Link to={COVERAGE_URL}>
						{COVERAGE_NAME}
					</Link>
					{' < '}
					<Link to={COVERAGE_URL+'/'+directory}>
						{directory}
					</Link>
					{' < '+file}
				</div>
			viewedObject = this.props.coverage.directories[directory].files[file]
		}
		else {
			navView =
				<div className="previous">
					<Link to={COVERAGE_URL}>
						{COVERAGE_NAME}
					</Link>
					{' < unknown'}
				</div>
		}

		if (path.length < 4) { // directories/files
			legend =
				<div className="legend">
					<div className="leg low">low: &lt; {COVERAGE_MID_LIMIT}%</div>
					<div className="leg med">medium: >= {COVERAGE_MID_LIMIT}%</div>
					<div className="leg hi">high: >= {COVERAGE_HI_LIMIT}%</div>
				</div>
			coverageContent =
				<div className="coverage-listview">
					<div>
						<div className="header cell">Directory</div>
						<div className="header cell">Line Coverage</div>
						<div className="header cell">Functions</div>
					</div>
					{content}
				</div>
		}
		else if (path.length === 4) { // source code view
			legend =
				<div className="legend">
					<div className="leg">Lines:</div>
					<div className="leg hit">hit</div>
					<div className="leg notHit">not hit</div>
				</div>
			coverageContent =
				<div className="coverage-codeview">
					<div className="codeview-header row">
						<div></div>
						<div>Line data</div>
						<div>Source code</div>
					</div>
					<pre className="source">
						<Loading status={this.state.contentStatus} />
						{this.state.content}
					</pre>
				</div>
		}

		return (
			this.renderCoverage(navView, test, date, legend, viewedObject, coverageContent)
		)
	}
}

export default Coverage
