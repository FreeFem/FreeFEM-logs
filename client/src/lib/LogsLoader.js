export function LogsLoader (API, app) {
	// Get jobs
	fetch(API+'getLogJobs', {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
  .then(response => response.json())
	.then(response => {
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
			})
      .then(response => response.json())
			.then(response => {
				const directories = response
				logs[job] = {directories: []}

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
					})
          .then(response => response.json())
					.then(response => {
						const files = response
						const logsJob = logs[job]
						logsJob.directories[directory] = {files: files}

						app.setState(prevState => ({
              ...prevState,
              logs: logs
            }))
					})
          .catch(err => {
            app.setState(prevState => ({
              ...prevState,
              error: 'LogsLoader: Unable to load log files for '+job+' / '+directory
            }))
          })
				})
				// End get files
			})
      .catch(err => {
        app.setState(prevState => ({
          ...prevState,
          error: 'LogsLoader: Unable to load job directories for '+job
        }))
      })
		})
		// End get directories
	})
  .catch(err => { // End get jobs
    app.setState(prevState => ({
      ...prevState,
      error: 'LogsLoader: Unable to load job list'
    }))
  })
}