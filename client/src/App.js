import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { HOME_URL, LOGS_URL, COVERAGE_URL, TIMING_URL } from './config/Config'

import Header from './components/Header'
import Nav from './components/Nav'
import Footer from './components/Footer'
import APICheck from './components/APICheck'

import Home from './components/home/Home'
import Logs from './components/logs/Logs'
import Coverage from './components/coverage/Coverage'
import Timing from './components/timing/Timing'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Nav />
        <div id="content">
          <Route exact path={HOME_URL} component={Home} />
          <Route path={LOGS_URL} component={Logs} />
          <Route path={COVERAGE_URL} component={Coverage} />
          <Route path={TIMING_URL} component={Timing} />
        </div>
        <Footer />
        <APICheck />
      </BrowserRouter>
    );
  }
}

export default App;
