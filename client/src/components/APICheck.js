import React from 'react'

import { API } from '../config/Config'

const successText = 'API correctly connected'
const failureText = 'API connection failure'

class Footer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			status: [],
			text: []
		}
	}

	componentDidMount() {
		this.checkAPI()
	}
	
	componentDidUpdate(prevProps) {
		if (this.props.errorMessage !== prevProps.errorMessage)
			this.showError()
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
			} else {
				this.APIError()
			}
		})
		.catch(error => {
			this.APIError()
		})
	}
	
	showError = () => {
		this.APIError(this.props.errorMessage)
	}
	
	APISuccess = () => {
		this.setState(prevState => ({
			status: [...prevState.status, 'success'],
			text: [...prevState.text, successText]
		}))
		setTimeout(() => this.removeFirst(), 3000)
	}
	
	APIError = (message) => {
		const errorMessage = message ? message : failureText
		this.setState(prevState => ({
			status: [...prevState.status, 'failure'],
			text: [...prevState.text, errorMessage]
		}))
		setTimeout(() => this.removeFirst(), 3000)
	}
	
	removeFirst = () => {
		if (this.state.status.length === 1)
			this.setState(prevState => ({
				...prevState,
				status: ['api-check hide']
			}))
		else
			this.setState(prevState => ({
				status: prevState.status.splice(0, 1),
				text: prevState.text.splice(0, 1)
			}))
	}

	render() {
		const messages = this.state.status.map((status, i) =>
			<div key={i} className={status}>
				<p>{this.state.text[i]}</p>
			</div>
		)
		return (
			<div className="api-check">
				<div className={this.state.status}>
					{messages}
				</div>
			</div>
		)
	}
}

export default Footer