import React from 'react'
import './Home.css'

import { Redirect } from 'react-router-dom'

import { LOGS_URL, COVERAGE_URL, TIMING_URL } from '../../config/Config'

class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			redirect: '',
			coverage: {
				coverageDate: '',
				lineCoverage: '',
				functionCoverage: ''
			}
		}
	}
	
	componentDidMount() {
		
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
		
		const jobsList = Object.keys(this.props.logs).map(job =>
			<li key={job}>{job}</li>
		)
		return (
			<div className="Home">
        <div className="home-logs" onClick={() => this.goto(LOGS_URL)}>
          <h1>Logs report</h1>
          <div className="home-item">
						Jobs:
					</div>
					<div className="home-value">
						<ul>
							{jobsList}
						</ul>
					</div>
        </div>
        <div className="home-coverage" onClick={() => this.goto(COVERAGE_URL)}>
          <h1>Coverage report</h1>
					<div className="home-grid">
	          <div className="home-item">Last run:</div>
						<div className="home-value">{this.state.coverage.coverageDate}</div>
						<div className="home-item">Lines covered:</div>
						<div className="home-value{this.state.lineCoverageStyle}">{this.state.coverage.lineCoverage}</div>
						<div className="home-item">Functions covered:</div>
						<div className="home-value">{this.state.coverage.functionCoverage}</div>
					</div>
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
