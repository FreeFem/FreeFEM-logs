export function TimingLoader (API, app) {
  fetch(API+'getTiming', {
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
        error: 'Unable to load timing (API status: error)'
      }))
      
    app.setState(prevState => ({
      ...prevState,
      status: {
        ...prevState.status,
        timing: ''
      },
      timing: response
    }))
  })
  .catch(err => {
    app.setState(prevState => ({
      ...prevState,
      error: 'Unable to load timing '+err
    }))
  })
}