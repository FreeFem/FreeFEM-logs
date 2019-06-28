import React from 'react'
import './Loading.css'

class Loading extends React.Component {
	render() {
		return (
			<div className="Loading">
        <div className={this.props.status} />
      </div>
		)
	}
}

export default Loading
