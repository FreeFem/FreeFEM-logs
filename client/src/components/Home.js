import React from 'react'
import { Link } from 'react-router-dom'

export const API = process.env.REACT_APP_API || 'http://localhost:9000/'

class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			coverage: {
				coverageDate: '',
				lineCoverage: '',
				functionCoverage: ''
			}
		}
	}
	
	componentDidMount() {
		fetch(API+'getCoverageSummary', {
			method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		})
		.then(res => res.json())
		.then(res => {
			this.setState({
				coverage: {
					coverageDate: res.coverageDate,
					lineCoverage: res.lineCoverage,
					functionCoverage: res.functionCoverage
				}
			})
		})
		.catch(err => console.log(err))
	}
	
	render() {
		return (
			<div>
        <div class="home-logs">
          <h1>Logs report</h1>
          <p>summary</p>
        </div>
        <div class="home-coverage">
          <h1>Coverage report</h1>
          <p>Last run: {this.state.coverage.coverageDate}</p>
					<p>Lines covered: {this.state.coverage.lineCoverage}</p>
					<p>Functions covered: {this.state.coverage.functionCoverage}</p>
        </div>
        <div class="home-time">
          <h1>Time report</h1>
          <p>summary</p>
        </div>
      </div>
		)
	}
}

export default Home
