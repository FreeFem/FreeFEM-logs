import {
	LOGS_MID_LIMIT, LOGS_HI_LIMIT,
	LOGS_ZERO_COLOR, LOGS_LOW_COLOR, LOGS_MID_COLOR, LOGS_HI_COLOR
} from '../config/Config'

export function LogsLoader (API, app) {
	app.setState(prevState => ({
		...prevState,
		status: {
			...prevState.status,
			logs: 'loading'
		}
	}))
  fetch(API+'getLogs', {
    method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
  })
  .then(response => response.json())
  .then(response => {
		if (response.status && response.status === 'error')
      app.setState(prevState => ({
        ...prevState,
        error: 'Unable to load logs (API status: error)'
      }))
			
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
			status: {
				...prevState.status,
				logs: ''
			},
      logs: response
    }))
  })
  .catch(err => {
    app.setState(prevState => ({
      ...prevState,
      error: 'Unable to load logs '+err
    }))
  })
}
