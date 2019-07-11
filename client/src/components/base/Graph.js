import React from 'react'
import './Graph.css'

const CROSS = 4 // length of the axis that sticks out the graph
const MARGIN_X = 15
const MARGIN_Y = 15

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
		
		stepX = stepX ? stepX : (width/(data.length-1))
		let maxValue = Math.max.apply(Math, data)
		if (!maxValue)
			maxValue = 0.001
		
		let points = []
		for (var d = start; d <= end; d++)
			points.push((MARGIN_X + stepX*d) +','+ (MARGIN_Y + height-(data[d]*height/maxValue)))
		return points
	}

	pointToGraphPoint(index, data, point, height, stepX) {
		var coords = point.split(',')
		var x = coords[0]
		var y = coords[1]
		if (!data[index])
			return (
				<g className="failPoint" key={index}>
					<rect x={MARGIN_X+stepX*index-stepX/2} y={MARGIN_Y} width={stepX} height={height} />
					<text x={x} y={height} textAnchor="middle">Fail</text>
				</g>
			)
		return (
			<g className="dataPoint" key={index}>
				<text x={x} y={y} textAnchor="middle">{data[index]}</text>
				<circle cx={x} cy={y} r="3"/>
			</g>
		)
	}

	pp(x, y) {
		return x+','+y+' '
	}

	drawGraphPoints(w, h, d, s) {
		let points = this.dataToPoints(w, h, d, s)

		return (
			Object.entries(points).map(([index, point]) => 
				this.pointToGraphPoint(index, d, point, h, s)
			)
		)
	}

	render() {
		let d = Object.values(this.props.data)
		let s = Number(this.props.stepX)
		let w = Number(this.props.width)
		let h = Number(this.props.height)
		let svgW = w + (MARGIN_X*2)
		let svgH = h + (MARGIN_Y*2)

		return (
			<svg className="graph" viewBox={"0 0 "+svgW+" "+svgH} style={{width: svgW, height: svgH}}>
				<rect className="background" x={MARGIN_X} y={MARGIN_Y} width={w} height={h}/>
				<polyline className="x-axis" stroke-dasharray="4, 1" fill="none" stroke="#555" strokeWidth="2"
					points={this.pp(MARGIN_X-CROSS, h+MARGIN_Y)+this.pp(w+MARGIN_X, h+MARGIN_Y)}/>
				<polyline  className="y-axis" stroke-dasharray="4, 1" fill="none" stroke="#555" strokeWidth="2"
					points={this.pp(MARGIN_X, h+MARGIN_Y+CROSS)+this.pp(MARGIN_X, MARGIN_Y)}/>
				{this.drawGraphLine(w, h, d, s)}
				{this.drawGraphPoints(w, h, d, s)}
			</svg>
		)
	}
}

export default Graph
