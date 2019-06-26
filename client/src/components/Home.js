import React from 'react'
import './Home.css'

import { Redirect } from 'react-router-dom'

export const API = process.env.REACT_APP_API || 'http://localhost:9000/'

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
		if (this.state.redirect === 'coverage')
			return <Redirect push to='coverage/' />
			
		return (
			<div className="Home">
        <div className="home-logs" onClick={() => this.goto('logs')}>
          <h1>Logs report</h1>
          <p>summary</p>
        </div>
        <div className="home-coverage" onClick={() => this.goto('coverage')}>
          <h1>Coverage report</h1>
          <p><b>Last run:</b> {this.state.coverage.coverageDate}</p>
					<p><b>Lines covered:</b> {this.state.coverage.lineCoverage}</p>
					<p><b>Functions covered:</b> {this.state.coverage.functionCoverage}</p>
        </div>
        <div className="home-timing" onClick={() => this.goto('timing')}>
          <h1>Timing report</h1>
          <p>summary</p>
        </div>
      </div>
		)
	}
}

export default Home
