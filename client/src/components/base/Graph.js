import React from 'react'
import './Graph.css'

class Graph extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	dataToPolylinePoints(width, height, data) {
		data = Object.values(data)
		if (data.length <= 1)
			return ''
		
		let stepX = width/(data.length-1)
		let maxValue = Math.max.apply(Math, data)
		if (maxValue <= 0)
			maxValue = 1
		
		return Object.entries(data).map(([index, element]) =>
			(stepX*index) +','+ (height-(element*height/maxValue))
		)
	}

	render() {
		let w = this.props.width
		let h = this.props.height
		let d = this.props.data

		return (
			<svg viewBox={"0 0 "+w+" "+h} className="chart" style={{width: w, height: h}}>
				<polyline
					fill="none"
					stroke="#0074d9"
					strokeWidth="2"
					points={this.dataToPolylinePoints(w, h, d)}
				/>
			</svg>
		)
	}
}

export default Graph
