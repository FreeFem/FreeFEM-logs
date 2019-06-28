import React from 'react'

import Loading from '../base/Loading'

class Timing extends React.Component {
	render() {
		return (
			<div>
				<p>Display flags</p>
				<Loading status={this.props.satus} />
			</div>
		)
	}
}

export default Timing;
