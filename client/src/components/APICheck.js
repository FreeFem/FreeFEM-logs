import React from 'react'
import './APICheck.css'

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
		fetch('http://localhost:9000', {
			method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		})
		.then(res => res.json())
		.then(res => {
			if (res.api === 'ok') {
				this.setState({
					status: 'api-check success',
					text: successText
				})
			} else {
				this.setState({
					status: 'api-check failure',
					text: failureText
				})
			}
		})
		.catch(error => {
			this.setState({
				status: 'api-check failure',
				text: failureText
			})
		})

		setTimeout(() => this.setState({status: 'api-check hide'}), 3000)
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