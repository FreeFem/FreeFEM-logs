import React from 'react'
import './Graph.css'

class Graph extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	dataToPolylinePoints(width, height, data) {
		let polylinePoints = ''

		let stepX = width/(data.length-1)
		let maxValue = Math.max.apply(Math, data)
		let minValue = Math.min.apply(Math, data)

		data.forEach((element, index) => {
			polylinePoints += (stepX*index) +','+ (height-(element*height/maxValue)) +'\n'
		})
		return polylinePoints
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
