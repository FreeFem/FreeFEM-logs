export function CoverageLoader(API, app) {
  fetch(API+'getCoverageInfo', {
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
        error: 'Unable to load coverage (API status: error)'
      }))
      
    app.setState(prevState => ({
      ...prevState,
      status: {
        ...prevState.status,
        coverage: ''
      },
      coverage: response
    }))
  })
  .catch(err => {
    app.setState(prevState => ({
      ...prevState,
      error: 'Unable to load coverage '+err
    }))
  })
}