import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { API, HOME_URL, LOGS_URL, COVERAGE_URL, TIMING_URL } from './config/Config'

import Header from './components/Header'
import Nav from './components/Nav'
import Footer from './components/Footer'
import APICheck from './components/APICheck'

import Home from './components/home/Home'
import Logs from './components/logs/Logs'
import Coverage from './components/coverage/Coverage'
import Timing from './components/timing/Timing'

import { LogsLoader } from './lib/LogsLoader'
import { CoverageLoader } from './lib/CoverageLoader'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
      status: {
        logs: '',
        coverage: '',
        timing: ''
      },
      logs: {},
      coverage: {},
      timing: {}
    }
  }
  
  componentDidMount() {
    this.loadLogs()
    this.loadCoverage()
  }
  
  /**
   * Load all logs
   */
  loadLogs = () => {
    LogsLoader(API, this)
  }
  
  /**
    * Load all coverage data
    */
  loadCoverage = () => {
    CoverageLoader(API, this)
  }
  
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Nav />
        <div id="content">
          <Route exact path={HOME_URL} render={(props) => <Home {...props} status={this.state.status} logs={this.state.logs} coverage={this.state.coverage} />} />
          <Route path={LOGS_URL} render={(props) => <Logs {...props} logs={this.state.logs} />} />
          <Route path={COVERAGE_URL} render={(props) => <Coverage {...props} coverage={this.state.coverage} />} />
          <Route path={TIMING_URL} component={Timing} />
        </div>
        <Footer />
        <APICheck errorMessage={this.state.error} />
      </BrowserRouter>
    );
  }
}

export default App;
