import React from 'react'
import './Graph.css'

class Graph extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	drawGraphLine(w, h, d, s) {
		let linesPoints = []
		let missingTimeIndexes = []
		for (var t = 0; t < d.length; t++) {
			if (d[t] === null)
				missingTimeIndexes.push(t)
		}

		let start = 0, end
		for (var i = 0; i < missingTimeIndexes.length + 1; i++) {
			end = (i < missingTimeIndexes.length) ? (missingTimeIndexes[i] -1) : (d.length - 1)

			if (end === start) {
				start = end + 2
				continue
			}

			var points = this.dataToPoints(w, h, d, s, start, end)
			linesPoints.push(points)
			start = end + 2
		}

		return (
			Object.values(linesPoints).map(linePoints =>
				<polyline
					fill="none"
					stroke="#0074d9"
					strokeWidth="2"
					points={linePoints}
				/>
			)
		)
	}

	dataToPoints(width, height, data, stepX, start, end) {
		if (data.length <= 0)
			return []

		start = start ? start : 0
		end = end ? end : (data.length - 1)

		// SVG margin
		let margin = 6
		width -= margin
		height -= margin
		
		stepX = stepX ? stepX : (width/(data.length-1))
		let maxValue = Math.max.apply(Math, data)
		if (!maxValue)
			maxValue = 0.001
		
		let points = []
		for (var d = start; d <= end; d++)
			points.push((margin/2 + stepX*d) +','+ (margin/2 + height-(data[d]*height/maxValue)))
		return points
	}

	pointToGraphPoint(index, data, point, height) {
		var coords = point.split(',')
		var x = coords[0]
		var y = coords[1]
		if (!data[index])
			return <text x={x} y={height} textAnchor="middle">Fail</text>
		return (
			<g className="dataPoint" key={index}>
				<text x={x} y={y} textAnchor="middle">{data[index]}</text>
				<circle cx={x} cy={y} r="3"/>
			</g>
		)
	}

	drawGraphPoints(w, h, d, s) {
		let points = this.dataToPoints(w, h, d, s)

		return (
			Object.entries(points).map(([index, point]) => 
				this.pointToGraphPoint(index, d, point, h)
			)
		)
	}

	render() {
		let d = Object.values(this.props.data)
		let s = this.props.stepX
		let w = this.props.width
		let h = this.props.height

		return (
			<svg viewBox={"0 0 "+w+" "+h} className="graph" style={{width: w, height: h}}>
				{this.drawGraphLine(w, h, d, s)}
				{this.drawGraphPoints(w, h, d, s)}
			</svg>
		)
	}
}

export default Graph
