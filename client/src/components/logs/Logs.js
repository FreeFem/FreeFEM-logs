import React from 'react'
import './Logs.css'

import { Link } from 'react-router-dom'

import { LOGS_URL, LOGS_NAME } from '../../config/Config'

class Logs extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

  render() {
		const currentURL = this.props.location.pathname
		let path = currentURL.split('/')
		path = path.filter(e => e !== '')
		
		let previous
		let title
		let content
		
		if (path.length === 1) {
			const jobs = this.props.logs
			title =
				<div>
					<p>Job list</p>
				</div>
			content = Object.keys(jobs).map(job =>
				<Link to={LOGS_URL+'/'+job} key={job} className={jobs[job].class} style={jobs[job].style}><p>{job}</p><p>Failed: {jobs[job].count}</p></Link>
			)
		} else if (path.length === 2) {
			const job = path[1]
			if (!this.props.logs[job])
				return (<div/>)
			const directories = this.props.logs[job].directories
			previous =
				<div className="previous">
					<Link to={LOGS_URL}>
						&lt; {LOGS_NAME}
					</Link>
				</div>
			title =
				<div>
					<p>{job}</p>
				</div>
			content = Object.keys(directories).map(directory =>
				<Link to={LOGS_URL+'/'+job+'/'+directory} key={directory} className={directories[directory].class} style={directories[directory].style}><p>{directory}</p><p>Failed: {directories[directory].count}</p></Link>
			)
		} else if (path.length === 3) {
			const job = path[1]
			if (!this.props.logs[job])
				return (<div/>)
			const directory = path[2]
			if (!this.props.logs[job].directories[directory])
				return (<div/>)
			const files = this.props.logs[job].directories[directory].files
			previous =
				<div className="previous">
					<Link to={LOGS_URL}>
						&lt; {LOGS_NAME}
					</Link>
					<Link to={LOGS_URL+'/'+job}>
						&lt; {job}
					</Link>
				</div>
			title =
				<div>
					<p>{job} - {directory}</p>
				</div>
			content = Object.keys(files).map(file =>
				<Link to={LOGS_URL+'/'+job+'/'+directory+'/'+file} key={file} className={files[file].class} style={files[file].style}><p>{file}</p></Link>
			)
		} else if (path.length === 4) {
			const job = path[1]
			if (!this.props.logs[job])
				return (<div/>)
			const directory = path[2]
			if (!this.props.logs[job].directories[directory])
				return (<div/>)
			const file = path[3]
			if (!this.props.logs[job].directories[directory].files[file])
				return (<div/>)
			const fileContent = this.props.logs[job].directories[directory].files[file]
			previous =
				<div className="previous">
					<Link to={LOGS_URL}>
						&lt; {LOGS_NAME}
					</Link>
					<Link to={LOGS_URL+'/'+job}>
						&lt; {job}
					</Link>
					<Link to={LOGS_URL+'/'+job+'/'+directory}>
						&lt; {directory}
					</Link>
				</div>
			title =
				<div>
					<p>{job} - {directory} - {file}</p>
				</div>
			content =
				<pre><code>{fileContent}</code></pre>
		} else {
			previous =
				<div className="previous">
					<Link to={LOGS_URL}>
						&lt; {LOGS_NAME}
					</Link>
				</div>
		}
			
    return (
			<div className="Logs">
				{previous}
				{title}
				{content}
			</div>
		)
  }
}

export default Logs;
