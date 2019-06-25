import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../assets/logo.png'

class Header extends React.Component {
	render() {
		return (
			<header>
				<Link to='/'>
					<img src={logo} alt="logo" />
					<div>
						<h1>Unit-tests</h1>
					</div>
				</Link>
			</header>
		)
	}
}

export default Header