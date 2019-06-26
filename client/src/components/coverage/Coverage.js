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
		this.getCoverageFile('index.html')
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
		.then(res => res.json())
		.then(res => {
			this.setState({
				title: res.title,
				summary: res.summary,
				contentHeader: res.contentHeader,
				content: res.content
			})
		})
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
