import React from 'react'
import './Coverage.css'

export const API = process.env.REACT_APP_API || 'http://localhost:9000/'

const CoverageDirectory = '../coverage/'

class Coverage extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			coverageInfo: ''
		}
	}

	componentDidMount() {
		this.getCoverageInfo()
	}

	renderTable(table) {
		console.log(table)
		return table.map(line => {
		   	return (
				<tr>
					{line.map(elt => <td>{elt}</td>)}
				</tr>
		   	)
		})
	}

	getCoverageInfo() {
		fetch(API+'getCoverageInfo', {
			method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.text())
		.then(res => this.setState({coverageInfo: res}))
		.catch(err => console.log(err))
	}
	
	render() {
		return (
			<div>
				{this.state.coverageInfo}
         	</div>
		)
	}
}

export default Coverage;
