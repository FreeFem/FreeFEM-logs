import React from 'react'
import './Coverage.css'

export const API = process.env.REACT_APP_API || 'http://localhost:9000/'

const CoverageDirectory = '../coverage/'

String.prototype.insert = function (index, string) {
	if (index > 0)
	  	return this.substring(0, index) + string + this.substring(index, this.length);
	return string + this;
};

class Coverage extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			content: ''
		}
	}

	componentDidMount() {
		this.getCoverageFile('index.html')
	}

	getCoverageFile(filePath) {
		fetch(API+'getCoverageFile', {
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({file: CoverageDirectory+filePath})
		})
		.then(res => res.text())
		.then(res => this.setState({content: res}))
	}
	
	render() {
		return (
			<div>{this.state.content}</div>
		)
	}
}

export default Coverage;
