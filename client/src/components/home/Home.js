import React from 'react'
import './Home.css'

import { Redirect } from 'react-router-dom'

import { API, LOGS_URL, COVERAGE_URL, TIMING_URL } from '../../config/Config'

class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			redirect: '',
			coverage: {
				coverageDate: '',
				lineCoverage: '',
				functionCoverage: ''
			},
			coverageList: ''
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
			const coverageList = 
				<ul>
					<li><b>Last run:</b> {this.state.coverage.coverageDate}</li>
					<li><b>Lines covered:</b> {this.state.coverage.lineCoverage}</li>
					<li><b>Functions covered:</b> {this.state.coverage.functionCoverage}</li>
				</ul>
			this.setState(prevState => ({
				...prevState,
				coverage: {
					coverageDate: res.coverageDate,
					lineCoverage: res.lineCoverage,
					functionCoverage: res.functionCoverage
				},
				coverageList: coverageList
			}))
		})
		.catch(err => console.log(err))
	}
	
	goto = (url) => {
		this.setState(prevState => ({
			...prevState,
			redirect: url
		}))
	}
	
	render() {
		if (this.state.redirect)
			return <Redirect push to={this.state.redirect} />
			
		return (
			<div className="Home">
        <div className="home-logs" onClick={() => this.goto(LOGS_URL)}>
          <h1>Logs report</h1>
          <p>summary</p>
        </div>
        <div className="home-coverage" onClick={() => this.goto(COVERAGE_URL)}>
          <h1>Coverage report</h1>
          <p><b>Last run:</b> {this.state.coverage.coverageDate}</p>
					<p><b>Lines covered:</b> {this.state.coverage.lineCoverage}</p>
					<p><b>Functions covered:</b> {this.state.coverage.functionCoverage}</p>
        </div>
        <div className="home-timing" onClick={() => this.goto(TIMING_URL)}>
          <h1>Timing report</h1>
          <p>summary</p>
        </div>
      </div>
		)
	}
}

export default Home
