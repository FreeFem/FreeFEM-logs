export function UnitLogsLoader (API, app) {
  fetch(API+'getUnitLogs', {
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
        error: 'Unable to load unit logs (API status: error)'
      }))
      
    app.setState(prevState => ({
      ...prevState,
      status: {
        ...prevState.status,
        unitlogs: ''
      },
      unitlogs: response
    }))
  })
  .catch(err => {
    app.setState(prevState => ({
      ...prevState,
      error: 'Unable to load unit logs '+err
    }))
  })
}