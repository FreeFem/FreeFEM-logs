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

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
      logs: {}
    }
  }
  
  componentDidMount() {
    this.loadLogs()
  }
  
  /*!
   * Load all logs
   */
  loadLogs = () => {
    LogsLoader(API, this)
  }
  
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Nav />
        <div id="content">
          <Route exact path={HOME_URL} render={(props) => <Home {...props} logs={this.state.logs} />} />
          <Route path={LOGS_URL} render={(props) => <Logs {...props} logs={this.state.logs} />} />
          <Route path={COVERAGE_URL} component={Coverage} />
          <Route path={TIMING_URL} component={Timing} />
        </div>
        <Footer />
        <APICheck errorMessage={this.state.error} />
      </BrowserRouter>
    );
  }
}

export default App;
