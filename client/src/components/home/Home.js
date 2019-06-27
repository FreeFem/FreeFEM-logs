import React from 'react'
import './Home.css'

import { Link, Redirect } from 'react-router-dom'

import {
	API, LOGS_NAME, COVERAGE_NAME, TIMING_NAME,
	LOGS_URL, COVERAGE_URL, TIMING_URL,
	LOGS_MID_LIMIT, LOGS_HI_LIMIT,
	LOGS_ZERO_COLOR, LOGS_LOW_COLOR, LOGS_MID_COLOR, LOGS_HI_COLOR
} from '../../config/Config'

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
		fetch(API+'getCoverageSummary', {
			method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		})
		.then(res => res.json())
		.then(res => {
			this.setState(prevState => ({
				...prevState,
				coverage: {
					coverageDate: res.coverageDate,
					lineCoverage: res.lineCoverage,
					functionCoverage: res.functionCoverage
				}
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
		
		const jobsList = Object.keys(this.props.logs).map(job =>
			<Link to={LOGS_URL+'/'+job} key={job} className={this.props.logs[job].class} style={this.props.logs[job].style}>{job}</Link>
		)
		return (
			<div className="Home">
        <div className="home-logs" onClick={() => this.goto(LOGS_URL)}>
          <h1>{LOGS_NAME} report</h1>
					<div className="home-legend">
						<p>
							Legend:
							<span style={{borderColor: LOGS_ZERO_COLOR}}>Zero fail</span>
							<span style={{borderColor: LOGS_LOW_COLOR}}>&lt; {LOGS_MID_LIMIT} fails</span>
							<span style={{borderColor: LOGS_MID_COLOR}}>&lt; {LOGS_HI_LIMIT} fails</span>
							<span style={{borderColor: LOGS_HI_COLOR}}>&gt; {LOGS_HI_LIMIT} fails</span>
						</p>
					</div>
          <div className="home-item">
						Jobs:
					</div>
					<div className="home-value">
						{jobsList}
					</div>
        </div>
        <div className="home-coverage" onClick={() => this.goto(COVERAGE_URL)}>
          <h1>{COVERAGE_NAME} report</h1>
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
          <h1>{TIMING_NAME} report</h1>
          <p>summary</p>
        </div>
      </div>
		)
	}
}

export default Home
