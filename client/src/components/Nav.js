import React from 'react'
import { Link } from 'react-router-dom'

const Home = 'Home'
const Logs = 'Logs'
const Coverage = 'Coverage'
const Flags = 'Flags'

class Nav extends React.Component {
	render() {
		return (
			<nav>
				<div>
					<Link to='/'>{Home}</Link>
				</div>
				<div>
					<Link to='/logs'>{Logs}</Link>
				</div>
				<div>
					<Link to='/coverage'>{Coverage}</Link>
				</div>
				<div>
					<Link to='/flags'>{Flags}</Link>
				</div>
			</nav>
		)
	}
}

export default Nav