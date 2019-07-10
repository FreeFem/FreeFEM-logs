import React from 'react'
import { Link } from 'react-router-dom'

import { HOME_NAME, HOME_URL,
	LOGS_NAME, LOGS_URL,
	COVERAGE_NAME, COVERAGE_URL,
	TIMING_NAME, TIMING_URL, UNITLOGS_URL, UNITLOGS_NAME } from '../config/Config'

class Nav extends React.Component {
	render() {
		return (
			<nav>
				<div>
					<Link to={HOME_URL}>{HOME_NAME}</Link>
				</div>
				<div>
					<Link to={LOGS_URL}>{LOGS_NAME}</Link>
				</div>
				<div>
					<Link to={COVERAGE_URL}>{COVERAGE_NAME}</Link>
				</div>
				<div>
					<Link to={UNITLOGS_URL}>{UNITLOGS_NAME}</Link>
				</div>
				<div>
					<Link to={TIMING_URL}>{TIMING_NAME}</Link>
				</div>
			</nav>
		)
	}
}

export default Nav