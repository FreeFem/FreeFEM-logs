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
			title: '',
			summary: [[]],
			contentHeader: [[]],
			content: [[]]
		}
	}

	componentDidMount() {
		this.getCoverageFile('index.html')
	}

	renderTable(table) {
		return table.map(line => {
		   	return (
				<tr>
					{line.map(elt => <td class={elt.class}>{elt.text}</td>)}
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
				<div class='title'>{this.props.state.title}</div>
				<table class='summary'>
					<tbody>
						{this.renderTable(this.props.state.summary)}
					</tbody>
				</table>
				<table class='contentHeader'>
					<tbody>
						{this.renderTable(this.props.state.contentHeader)}
					</tbody>
				</table>
				<table class='content'>
					<tbody>
						{this.renderTable(this.props.state.content)}
					</tbody>
				</table>
         	</div>
		)
	}
}

export default Coverage;
