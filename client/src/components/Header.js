import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../assets/logo.png'

import { HOME_URL } from '../config/Config'

class Header extends React.Component {
	render() {
		return (
			<header>
				<Link to={HOME_URL}>
					<img src={logo} alt="FreeFEM-logs" />
					<div>
						<h1>FreeFEM Logs</h1>
					</div>
				</Link>
			</header>
		)
	}
}

export default Header
