import React from 'react'
import './Coverage.css'

import { Link } from 'react-router-dom'
import { API, COVERAGE_URL, COVERAGE_NAME, COVERAGE_MID_LIMIT, COVERAGE_HI_LIMIT } from '../../config/Config'
import Loading from '../base/Loading'

function getCoverageClass(val) {
	if (val < COVERAGE_MID_LIMIT) return 'low'
	if (val > COVERAGE_MID_LIMIT && val < COVERAGE_HI_LIMIT) return 'med'
	if (val > COVERAGE_HI_LIMIT) return 'hi'
}

function getLineCoverageClass(line) {
	if (line === undefined)
		return ''
	return (line === 0) ? 'notHit' : 'hit'
}

function lineCoverage(obj) {
	let covClass = getCoverageClass(obj.linesCovered)
	return (
		<div className="row">
			<div className="coverageBar">
				<div className={"coverageProgress "+getCoverageClass(obj.linesCovered)} style={{width: Math.round(obj.linesCovered)}}></div>
			</div>
			<div className={'cell value '+covClass}>{obj.linesCovered}%</div>
			<div className={'cell value '+covClass}>{obj.nbLinesHit} / {obj.nbLines}</div>
		</div>
	)
}

function functionCoverage(obj) {
	let covClass = getCoverageClass(obj.functionsCovered)
	return (
		<div className="row">
			<div className="coverageBar">
				<div className={"coverageProgress "+getCoverageClass(obj.functionsCovered)} style={{width: Math.round(obj.functionsCovered)}}></div>
			</div>
			<div className={'cell value '+covClass}>{obj.functionsCovered}%</div>
			<div className={'cell value '+covClass}>{obj.nbFunctionsHit} / {obj.nbFunctions}</div>
		</div>
	)
}

function buildLineContent(input, file) {
	var lines = input.split(/(?:\r\n|\r|\n)/g);
	return Object.entries(lines).map(([index, element]) =>
		<div className="row" key={Number(index)+1}>
			<div className="lineNumber">{Number(index)+1}</div>
			<div className={"lineData "+getLineCoverageClass(file.lines[Number(index)+1])}>
				{(file.lines[Number(index)+1] === undefined ? '' : file.lines[Number(index)+1]) + ' :'}
			</div>
			<span className={getLineCoverageClass(file.lines[Number(index)+1])}>
				{element}
			</span>
		</div>
	)
}

class Coverage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			prevURL: '',
			content: 'content'
		}
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
			content = //([A, dirA], [B, dirB]) => dirA.linesCovered-dirB.linesCovered
				Object.entries(directories).sort().map(([dirName, dir]) =>
					<div key={dirName}>
						<div className="cell"><Link to={COVERAGE_URL+'/'+dirName} key={dirName}>{dirName}</Link></div>
						{lineCoverage(dir)}
						{functionCoverage(dir)}
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
						{lineCoverage(file)}
						{functionCoverage(file)}
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
			if (this.state.prevURL !== currentURL) {
				this.setState({prevURL: currentURL})
				fetch(API+'getSourceCode', {
					method: 'POST',
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						path: directory+'/'+file
					})
				})
				.then(res => res.text())
				.then(res => buildLineContent(res, viewedObject))
				.then(res => this.setState({content: res}))
			}
		}
		else {
			navView =
				<div className="previous">
					{' < '}
					<Link to={COVERAGE_URL}>
						{COVERAGE_NAME}
					</Link>
				</div>
		}

		if (path.length === 4) {
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
						{this.state.content}
					</pre>
				</div>
		}
		else {
			legend =
				<div className="legend">
					<div className="leg low">low: &lt; {COVERAGE_MID_LIMIT}</div>
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
						<div className={"value cell "+getCoverageClass(viewedObject.linesCovered)}>{viewedObject.linesCovered}%</div>

						<div className="label cell">Functions:</div>
						<div className="value cell">{viewedObject.nbFunctionsHit}</div>
						<div className="value cell">{viewedObject.nbFunctions}</div>
						<div className={"value cell "+getCoverageClass(viewedObject.linesCovered)}>{viewedObject.functionsCovered}%</div>
					</div>
				</div>

				{coverageContent}

			</div>
		)
	}
}

export default Coverage
