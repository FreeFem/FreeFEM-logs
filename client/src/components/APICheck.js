import React from 'react'
import './APICheck.css'

import { API } from '../config/Config'

const successText = 'API correctly connected'
const failureText = 'API connection failure'

class Footer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			status: '',
			text: ''
		}
	}

	componentWillMount() {
		this.checkAPI()
	}

	checkAPI() {
		fetch(API, {
			method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		})
		.then(res => res.json())
		.then(res => {
			if (res.api === 'ok') {
				this.APISuccess()
				setTimeout(() => this.setState({status: 'api-check hide'}), 3000)
			} else {
				this.APIError()
			}
		})
		.catch(error => {
			this.APIError()
		})
	}
	
	APISuccess = () => {
		this.setState({
			status: 'api-check success',
			text: successText
		})
	}
	
	APIError = () => {
		this.setState({
			status: 'api-check failure',
			text: failureText
		})
	}

	render() {
		return (
			<div className={this.state.status}>
				<p>
					{this.state.text}
				</p>
			</div>
		)
	}
}

export default Footer