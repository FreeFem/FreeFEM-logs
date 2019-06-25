import React from 'react'
import Link from './base/Link'

class Footer extends React.Component {
	render() {
		return (
			<footer>
				<p>FreeFEM 1986 - {new Date().getFullYear()}</p>
				<Link href="https://freefem.org" target="_blank" text="FreeFEM" />
			</footer>
		)
	}
}

export default Footer
