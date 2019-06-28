import React from 'react'
import './Coverage.css'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class Coverage extends React.Component {
	render() {
		return (
			<div>
				<Paper>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell></TableCell>
								<TableCell align="right">Hit</TableCell>
								<TableCell align="right">Total</TableCell>
								<TableCell align="right">Coverage</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell>Lines</TableCell>
								<TableCell align="right">{this.props.coverage.globalNbLinesHit}</TableCell>
								<TableCell align="right">{this.props.coverage.globalNbLines}</TableCell>
								<TableCell align="right">{this.props.coverage.globalLinesCovered}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Functions</TableCell>
								<TableCell align="right">{this.props.coverage.globalNbFuncHit}</TableCell>
								<TableCell align="right">{this.props.coverage.globalNbFunc}</TableCell>
								<TableCell align="right">{this.props.coverage.globalFunctionsCovered}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</Paper>
			</div>
		)
	}
}

export default Coverage;
