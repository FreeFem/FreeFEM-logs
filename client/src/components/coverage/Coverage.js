import React from 'react'
import './Coverage.css'

class Coverage extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			coverageInfo: ''
		}
	}

	componentDidMount() {
		//this.getCoverageInfo()
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
		// Use in App.js
		// memory leaks
		// setState when component is unmount (App.js is always mounted)
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
