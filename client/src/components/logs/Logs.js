import React from 'react'
import './Logs.css'

import { Link } from 'react-router-dom'

import { LOGS_URL, LOGS_NAME } from '../../config/Config'
// 
// export const LOW_LIMIT = 0
// export const MID_LIMIT = 10
// export const HIGH_LIMIT = 20
// export const COLOR_GREEN = 'green'
// export const COLOR_YELLOW = 'yellow'
// export const COLOR_ORANGE = 'orange'
// export const COLOR_RED = 'red'

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
		let content
		
		if (path.length === 1) {
			const jobs = this.props.logs
			content = Object.keys(jobs).map(job =>
				<Link to={LOGS_URL+'/'+job} key={job} className={jobs[job].class} style={jobs[job].style}>{job}</Link>
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
			content = Object.keys(directories).map(directory =>
				<Link to={LOGS_URL+'/'+job+'/'+directory} key={directory} className={directories[directory].class} style={directories[directory].style}>{directory}</Link>
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
			content = Object.keys(files).map(file =>
				<Link to={LOGS_URL+'/'+job+'/'+directory+'/'+file} key={file} className={files[file].class} style={files[file].style}>{file}</Link>
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
				{content}
			</div>
		)
  }
}

export default Logs;



// <section className="LogList">
// 	<article className="Jobs">
// 		<h2>Jobs</h2>
// 		<div>
// 			{this.state.jobsList}
// 		</div>
// 	</article>
// 	<article className="Directories">
// 		<h2>Directories</h2>
// 		<div>
// 			{this.state.directoriesList}
// 		</div>
// 	</article>
// 	<article className="Files">
// 		<h2>Files</h2>
// 		<div>
// 			{this.state.filesList}
// 		</div>
// 	</article>
// 	<article className="Content">
// 		<h2>Content</h2>
// 		<div>
// 			<b>Current file:</b> {this.state.file}
// 			<pre>
// 				<code>
// 					{this.state.content}
// 				</code>
// 			</pre>
// 		</div>
// 	</article>
// </section>