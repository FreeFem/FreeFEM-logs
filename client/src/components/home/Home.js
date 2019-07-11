import React from 'react'
import './Home.css'

import { Link, Redirect } from 'react-router-dom'

import Loading from '../base/Loading'
import MyLink from '../base/Link'

import {
	LOGS_NAME, COVERAGE_NAME, UNITLOGS_NAME, TIMING_NAME,
	LOGS_URL, COVERAGE_URL, UNITLOGS_URL, TIMING_URL,
	LOGS_MID_LIMIT, LOGS_HI_LIMIT,
	LOGS_ZERO_COLOR, LOGS_LOW_COLOR, LOGS_MID_COLOR, LOGS_HI_COLOR
} from '../../config/Config'

class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			redirect: '',
		}
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
							<span style={{borderColor: LOGS_ZERO_COLOR}}>0 fail</span>
							<span style={{borderColor: LOGS_LOW_COLOR}}>&lt; {LOGS_MID_LIMIT} fail</span>
							<span style={{borderColor: LOGS_MID_COLOR}}>&lt; {LOGS_HI_LIMIT} fail</span>
							<span style={{borderColor: LOGS_HI_COLOR}}>&gt; {LOGS_HI_LIMIT} fail</span>
						</p>
					</div>
          <div className="home-item">
						Jobs:
					</div>
					<Loading status={this.props.status.logs} />
					<div className="home-value">
						{jobsList}
					</div>
        </div>
        <div className="home-coverage" onClick={() => this.goto(COVERAGE_URL)}>
          <h1>{COVERAGE_NAME} report</h1>
					<Loading status={this.props.status.coverage} />
					<div className="home-grid">
	          <div className="home-item">Last run:</div>
						<div className="home-value">{this.props.coverage.date}</div>
						<div className="home-item">Lines covered:</div>
						<div className="home-value">{this.props.coverage.linesCovered}% ({this.props.coverage.nbLinesHit} / {this.props.coverage.nbLines})</div>
						<div className="home-item">Functions covered:</div>
						<div className="home-value">{this.props.coverage.functionsCovered}% ({this.props.coverage.nbFunctionsHit} / {this.props.coverage.nbFunctions})</div>
					</div>
        </div>
				<div className="home-unittests" onClick={() => this.goto(UNITLOGS_URL)}>
          <h1>{UNITLOGS_NAME} report</h1>
          <Loading status={this.props.status.unitLogs} />
					<div className="home-grid">
	          <div className="home-item">Successful tests:</div>
						<div className="home-value">{this.props.unitLogs.validUnitTests} / {this.props.unitLogs.totalUnitTests}</div>
					</div>
        </div>
        <div className="home-timing" onClick={() => this.goto(TIMING_URL)}>
          <h1>{TIMING_NAME} report</h1>
          <Loading status={this.props.status.timing} />
        </div>
				<div className="home-github">
					<h1>Need more features ?</h1>
					<p>
						Ask in <MyLink href="https://github.com/FreeFem/FreeFEM-logs/issues" text="GitHub issues" />
					</p>
				</div>
      </div>
		)
	}
}

export default Home
