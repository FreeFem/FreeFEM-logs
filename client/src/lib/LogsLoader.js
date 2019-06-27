import {
	LOGS_MID_LIMIT, LOGS_HI_LIMIT,
	LOGS_ZERO_COLOR, LOGS_LOW_COLOR, LOGS_MID_COLOR, LOGS_HI_COLOR
} from '../config/Config'

export function LogsLoader (API, app) {
  fetch(API+'getLogs', {
    method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
  })
  .then(response => response.json())
  .then(response => {
    const logs = response
    
    Object.keys(logs).forEach(job => {
      const currentJob = logs[job]
      const count = currentJob.count
      if (count === 0) {
        currentJob.class = 'zero'
        currentJob.style = {borderColor: LOGS_ZERO_COLOR}
      } else if (count < LOGS_MID_LIMIT) {
        currentJob.class = 'low'
        currentJob.style = {borderColor: LOGS_LOW_COLOR}
      } else if (count < LOGS_HI_LIMIT) {
        currentJob.class = 'med'
        currentJob.style = {borderColor: LOGS_MID_COLOR}
      } else {
        currentJob.class = 'hi'
        currentJob.style = {borderColor: LOGS_HI_COLOR}
      }
      
      Object.keys(currentJob.directories).forEach(directory => {
        const currentDirectory = currentJob.directories[directory]
        const count = currentDirectory.count
        if (count === 0) {
          currentDirectory.class = 'zero'
          currentDirectory.style = {borderColor: LOGS_ZERO_COLOR}
        } else if (count < LOGS_MID_LIMIT) {
          currentDirectory.class = 'low'
          currentDirectory.style = {borderColor: LOGS_LOW_COLOR}
        } else if (count < LOGS_HI_LIMIT) {
          currentDirectory.class = 'med'
          currentDirectory.style = {borderColor: LOGS_MID_COLOR}
        } else {
          currentDirectory.class = 'hi'
          currentDirectory.style = {borderColor: LOGS_HI_COLOR}
        }
      })
    })
    
    app.setState(prevState => ({
      ...prevState,
      logs: response
    }))
  })
  .catch(err => {
    app.setState(prevState => ({
      ...prevState,
      error: 'Unable to load logs'
    }))
  })
}

// export function LogsLoader (API, app) {
// 	// Get jobs
// 	fetch(API+'getLogJobs', {
// 		method: 'GET',
// 		headers: {
// 			'Access-Control-Allow-Origin': '*'
// 		}
// 	})
//   .then(response => response.json())
// 	.then(response => {
// 		const jobs = response
// 		const logs = {}
// 
// 		// Get directories
// 		jobs.forEach(job => {
// 			fetch(API+'getLogDirectories', {
// 				method: 'POST',
// 				headers: {
// 					'Access-Control-Allow-Origin': '*',
// 					'Accept': 'application/json',
// 					'Content-Type': 'application/json'
// 				},
// 				body: JSON.stringify({job: job})
// 			})
//       .then(response => response.json())
// 			.then(response => {
// 				const directories = response
// 				logs[job] = {directories: []}
// 
// 				// Get files
// 				directories.forEach(directory => {
// 					fetch(API+'getLogFiles', {
// 						method: 'POST',
// 						headers: {
// 							'Access-Control-Allow-Origin': '*',
// 							'Accept': 'application/json',
// 							'Content-Type': 'application/json'
// 						},
// 						body: JSON.stringify({job: job, directory: directory})
// 					})
//           .then(response => response.json())
// 					.then(response => {
// 						const files = response
// 						const logsJob = logs[job]
// 						logsJob.directories[directory] = {count: files.length, files: files}
// 
// 						app.setState(prevState => ({
//               ...prevState,
//               logs: logs
//             }))
// 					})
//           .catch(err => {
//             app.setState(prevState => ({
//               ...prevState,
//               error: 'LogsLoader: Unable to load log files for '+job+' / '+directory
//             }))
//           })
// 				})
// 				// End get files
// 			})
//       .catch(err => {
//         app.setState(prevState => ({
//           ...prevState,
//           error: 'LogsLoader: Unable to load job directories for '+job
//         }))
//       })
// 		})
// 		// End get directories
// 	})
//   .catch(err => { // End get jobs
//     app.setState(prevState => ({
//       ...prevState,
//       error: 'LogsLoader: Unable to load job list'
//     }))
//   })
// }
// 
// export function LogsProccessing (app) {
//   const logs = app.state.logs
//   console.log(logs)
// }