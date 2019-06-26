import React from 'react'
import { Link } from 'react-router-dom'

class Home extends React.Component {
	render() {
		return (
			<div>
        <div class="home-logs">
          <h1>Logs report</h1>
          <p>summary</p>
        </div>
        <div class="home-coverage">
          <h1>Coverage report</h1>
          <p>summary</p>
        </div>
        <div class="home-time">
          <h1>Time report</h1>
          <p>summary</p>
        </div>
      </div>
		)
	}
}

export default Home
