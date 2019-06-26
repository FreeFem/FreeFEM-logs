import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header'
import Nav from './components/Nav'
import Footer from './components/Footer'
import APICheck from './components/APICheck'

import Home from './components/Home'
import Logs from './components/logs/Logs'
import Coverage from './components/coverage/Coverage.js';
import Flags from './components/Flags.js';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Nav />
        <div id="content">
          <Route exact path="/" component={Home} />
          <Route path="/logs" component={Logs} />
          <Route path="/coverage" component={Coverage} />
          <Route path="/flags" component={Flags} />
        </div>
        <Footer />
        <APICheck/>
      </BrowserRouter>
    );
  }
}

export default App;
