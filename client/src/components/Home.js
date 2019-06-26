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
	
	gotoCoverage = () => {
		this.setState({redirect: 'coverage'})
	}
	
	render() {
		if (this.state.redirect === 'coverage')
			return <Redirect push to='coverage/' />
			
		return (
			<div className="Home">
        <div className="home-logs">
          <h1>Logs report</h1>
          <p>summary</p>
        </div>
        <div className="home-coverage" onClick={() => this.gotoCoverage()}>
          <h1>Coverage report</h1>
          <p><b>Last run:</b> {this.state.coverage.coverageDate}</p>
					<p><b>Lines covered:</b> {this.state.coverage.lineCoverage}</p>
					<p><b>Functions covered:</b> {this.state.coverage.functionCoverage}</p>
        </div>
        <div className="home-time">
          <h1>Time report</h1>
          <p>summary</p>
        </div>
      </div>
		)
	}
}

export default Home
