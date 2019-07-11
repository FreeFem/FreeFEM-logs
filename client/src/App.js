import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { API, HOME_URL, LOGS_URL, COVERAGE_URL, UNITLOGS_URL, TIMING_URL } from './config/Config'

import Header from './components/Header'
import Nav from './components/Nav'
import Footer from './components/Footer'
import APICheck from './components/APICheck'

import Home from './components/home/Home'
import Logs from './components/logs/Logs'
import Coverage from './components/coverage/Coverage'
import UnitTests from './components/unittests/UnitTests';
import Timing from './components/timing/Timing'

import { LogsLoader } from './lib/LogsLoader'
import { CoverageLoader } from './lib/CoverageLoader'
import { UnitLogsLoader } from './lib/UnitLogsLoader'
import { TimingLoader } from './lib/TimingLoader'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
      status: {
        logs: 'loading',
        coverage: 'loading',
        unitLogs: 'loading',
        timing: 'loading'
      },
      logs: {},
      coverage: {},
      unitLogs: {},
      timing: {}
    }
  }

  componentDidMount() {
    this.loadLogs()
    this.loadCoverage()
    this.loadUnitLogs()
    this.loadTiming()
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

  /**
    * Load all unit-tests logs
    */
  loadUnitLogs = () => {
    UnitLogsLoader(API, this)
  }

  /**
    * Load all timing data
    */
  loadTiming = () => {
    TimingLoader(API, this)
  }

  render() {
    return (
      <BrowserRouter>
        <Header />
        <Nav />
        <div id="content">
          <Route exact path={HOME_URL} render={(props) => <Home {...props} status={this.state.status}
            logs={this.state.logs}
            coverage={this.state.coverage}
            unitLogs={this.state.unitLogs}
            timing={this.state.timing} />}
          />
          <Route path={LOGS_URL} render={(props) => <Logs {...props} status={this.state.status.logs} logs={this.state.logs} />} />
          <Route path={COVERAGE_URL} render={(props) => <Coverage {...props} status={this.state.status.coverage} coverage={this.state.coverage} />} />
          <Route path={UNITLOGS_URL} render={(props) => <UnitTests {...props} status={this.state.status.unitLogs} unitLogs={this.state.unitLogs} />} />
          <Route path={TIMING_URL} render={(props) => <Timing {...props} status={this.state.status.timing} timing={this.state.timing} />} />
        </div>
        <Footer />
        <APICheck errorMessage={this.state.error} />
      </BrowserRouter>
    )
  }
}

export default App
