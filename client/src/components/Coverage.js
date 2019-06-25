import React from 'react'

export const API = process.env.REACT_APP_API || 'http://localhost:9000/'

class Coverage extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			covFile: ''
		}
	}

	componentDidMount() {
		this.getCoverageFile()
	}

	getCoverageFile() {
		fetch(API+'getCoverageFile', {
			method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*'
			}})
		.then(res => res.text())
		.then(res => this.setState({covFile: res}))
	}
	
	render() {
		return (
			<div>{this.state.covFile}</div>
		)
	}
}

export default Coverage;
