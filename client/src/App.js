import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header'
import Nav from './components/Nav'
import Footer from './components/Footer'
import APICheck from './components/APICheck'

import Logs from './components/Logs.js'
import Coverage from './components/Coverage.js';
import Flags from './components/Flags.js';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Nav />
        <div id="content">
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
