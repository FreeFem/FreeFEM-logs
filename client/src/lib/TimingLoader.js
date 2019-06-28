export function TimingLoader (API, app) {
  app.setState(prevState => ({
    ...prevState,
    status: {
      ...prevState,
      timing: ''
    }
  }))
}