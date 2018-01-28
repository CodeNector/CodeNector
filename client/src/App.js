import 'babel-polyfill';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import HomePage from './components/pages/HomePage'
// import Room "./components/Room"

const store = createStore(reducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
        <Route exact path="/" component={HomePage} />
        {/* <Route exact path="/rooms/:id" component={Room} /> */}
      </Router>
    </Provider>,
    document.getElementById('root')
    );
  }
}

export default App;
