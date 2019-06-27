import React from 'react'
import './Coverage.css'

export const API = process.env.REACT_APP_API || 'http://localhost:9000/'

const CoverageDirectory = '../coverage/'

class Coverage extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			title: 'bs',
			test: [[1, 2, 3], [4, 5, 6]],
			summary: [[]],
			contentHeader: [[]],
			content: [[]]
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
		.then(res => res.json())
		.catch(err => console.log(err))
	}
	
	render() {
		return (
			<div>
				<div class='title'>{this.state.title}</div>
				<table class='summary'>
					<tbody>
						{this.renderTable(this.state.test)}
					</tbody>
				</table>
         	</div>
		)
	}
}

export default Coverage;
