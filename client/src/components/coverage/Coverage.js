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
			covFile: ''
		}
	}

	componentDidMount() {
		this.getCoverageFile('index.html')
	}

	componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
			var url = this.props.location.pathname
			var filePath = url.substring(url.indexOf('/') + 1)
			//this.props.location.pathname.insert(url.indexOf('/'), 'coverage')
			this.getCoverageFile(filePath)
        }
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
		.then(res => this.setState({covFile: res}))
	}
	
	render() {
		return (
			<div dangerouslySetInnerHTML={{__html: this.state.covFile}}></div>
		)
	}
}

export default Coverage;
