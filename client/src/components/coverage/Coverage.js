import React from 'react'
import './Coverage.css'

function displayPrecision(x) {
  return Number.parseFloat(x).toFixed(1);
}

class Coverage extends React.Component {
	render() {
		return (
			<div className="Coverage">

				<div className="coverage-summary">
					<div className="table-info">
						<div className="header">Current view:</div>
						<div>temp</div>

						<div className="header">Test:</div>
						<div>FreeFEM - unit tests</div>

						<div className="header">Date:</div>
						<div>temp</div>

						<div className="header">Legend:</div>
						<div>Rating: low: &lt; 65 % medium: &gt;= 65 % high: &gt;= 80 %</div>
					</div>
					<div className="table-summary">
						<div className="header"></div>
						<div className="header">Hit</div>
						<div className="header">Total</div>
						<div className="header">Coverage</div>
						
						<div>Lines</div>
						<div className="value">{this.props.coverage.globalNbLinesHit}</div>
						<div className="value">{this.props.coverage.globalNbLines}</div>
						<div className="value">{displayPrecision(this.props.coverage.globalLinesCovered)}</div>

						<div>Functions</div>
						<div className="value">{this.props.coverage.globalNbFuncHit}</div>
						<div className="value">{this.props.coverage.globalNbFunc}</div>
						<div className="value">{displayPrecision(this.props.coverage.globalFunctionsCovered)}</div>
					</div>
				</div>

				<div className="coverage-detail">

				</div>

			</div>
		)
	}
}

export default Coverage;
