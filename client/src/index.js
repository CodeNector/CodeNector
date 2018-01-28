import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import HomePage from './components/pages/HomePage';
// import Room "./components/Room";
import 'bootstrap/dist/css/bootstrap.css';


const store = configureStore();

render( 
	<Provider store={store}>
		<Router>
			<Route exact path="/" component={HomePage} />
			{/* <Route exact path="/rooms/:id" component={Room} /> */}
		</Router>
	</Provider>,
	document.getElementById('root')
);