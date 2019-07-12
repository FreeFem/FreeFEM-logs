import React from 'react'
import './Link.css'

import PropTypes from 'prop-types'

class Link extends React.Component {
	constructor(props) {
		super(props)
		this.state = {rel: ''}
	}

	componentDidMount() {
		if (this.props.target === undefined || this.props.target === '_blank')
			this.setState({rel: 'noopener noreferrer'})
	}

	render() {
		return (
			<a className="Link" href={this.props.href} target={this.props.target ? this.props.target : '_blank'} rel={this.state.rel}>{this.props.text}</a>
		)
	}
}

Link.propTypes = {
	target: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired
}

export default Link