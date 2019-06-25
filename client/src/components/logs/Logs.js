import React from 'react'
import './Logs.css'

export const API = process.env.REACT_APP_API || 'http://localhost:9000/'
export const LOW_LIMIT = 0
export const MID_LIMIT = 10
export const HIGH_LIMIT = 20
export const COLOR_GREEN = 'green'
export const COLOR_YELLOW = 'yellow'
export const COLOR_ORANGE = 'orange'
export const COLOR_RED = 'red'

class Logs extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			logs: '',
			jobsList: '',
			directoriesList: '',
			filesList: '',
			file: '',
			content: ''
		}
	}

	componentDidMount() {
		this.getFullLogs()
	}

	getFullLogs() {
		// Get jobs
		fetch(API+'getLogJobs', {
			method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		}).then(response => response.json())
		.then(response => {
			if (response.status !== undefined && response.status === 'error')
				return

			const jobs = response

			const logs = {}

			// Get directories
			jobs.forEach(job => {
				fetch(API+'getLogDirectories', {
					method: 'POST',
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({job: job})
				}).then(response => response.json())
				.then(response => {
					const directories = response

					logs[job] = {directories: [], color: COLOR_GREEN}

					// Get files
					directories.forEach(directory => {
						fetch(API+'getLogFiles', {
							method: 'POST',
							headers: {
								'Access-Control-Allow-Origin': '*',
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({job: job, directory: directory})
						}).then(response => response.json())
						.then(response => {
							const files = response

							const logsJob = logs[job]
							logsJob.directories[directory] = {files: files, color: COLOR_GREEN}

							// Color directory
							const nFiles = files.length
							if (nFiles > HIGH_LIMIT)
								logsJob.directories[directory].color = COLOR_RED
							else if (nFiles > MID_LIMIT)
								logsJob.directories[directory].color = COLOR_ORANGE
							else if (nFiles > LOW_LIMIT)
								logsJob.directories[directory].color = COLOR_YELLOW

							// Color job
							if ((logsJob.color === COLOR_ORANGE || logsJob.color === COLOR_YELLOW || logsJob.color === COLOR_GREEN) && nFiles > HIGH_LIMIT)
								logsJob.color = COLOR_RED
							if ((logsJob.color === COLOR_YELLOW || logsJob.color === COLOR_GREEN) && nFiles > MID_LIMIT)
								logsJob.color = COLOR_ORANGE
							else if (logsJob.color === COLOR_GREEN && nFiles > LOW_LIMIT)
								logsJob.color = COLOR_YELLOW

							this.setState({logs: logs})
							this.setJobsList()
						})
					})
					// End get files
				})
			})
			// End get directories
		})
		// End get jobs
	}

	setJobsList() {
		const jobs = Object.keys(this.state.logs)
		jobs.sort()
		const jobsList = jobs.map(job =>
			<button
				key={job}
				onClick={() => this.setDirectoriesList(job)}
				style={{borderColor: this.state.logs[job].color}}
				>
				{job}
			</button>
		)
		this.setState({jobsList: jobsList, directoriesList: '', filesList: '', file: '', content: ''})
	}

	setDirectoriesList(job) {
		const directories = this.state.logs[job].directories
		const directoriesKeys = Object.keys(directories)

		const directoriesList = directoriesKeys.map(directory =>
			<button
				key={directory}
				onClick={() => this.setFilesList(job, directory)}
				style={{borderColor: directories[directory].color}}
				>
				{directory}
			</button>
		)
		this.setState({directoriesList: directoriesList, filesList: '', file: '', content: ''})
	}

	setFilesList(job, directory) {
		const files = this.state.logs[job].directories[directory].files
		const filesList = files.map(file =>
			<button
				key={file}
				onClick={() => this.setContent(job, directory, file)}
				>
				{file}
			</button>
		)
		this.setState({filesList: filesList, file: '', content: ''})
	}

	setContent(job, directory, file) {
		fetch(API+'getLogContent', {
				method: 'POST',
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({job: job, directory: directory, file: file})
			}).then(response => response.json())
			.then(response => {
				const content = response
				this.setState({file: file, content: content})
			})
	}

  render() {
    return (
		<section className="LogList">
			<article className="Jobs">
				<h2>Jobs</h2>
				<div>
					{this.state.jobsList}
				</div>
			</article>
			<article className="Directories">
				<h2>Directories</h2>
				<div>
					{this.state.directoriesList}
				</div>
			</article>
			<article className="Files">
				<h2>Files</h2>
				<div>
					{this.state.filesList}
				</div>
			</article>
			<article className="Content">
				<h2>Content</h2>
				<div>
					<b>Current file:</b> {this.state.file}
					<pre>
						<code>
							{this.state.content}
						</code>
					</pre>
				</div>
			</article>
		</section>
	)
  }
}

export default Logs;
