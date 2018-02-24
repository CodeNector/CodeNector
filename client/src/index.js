import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import HomePage from './components/pages/HomePage';
import Room from './components/Room';
import Nav from './components/Nav';
import 'bootstrap/dist/css/bootstrap.css';

import Login from './components/login/login';
import Logout from './components/logout/logout';
import Register from './components/registration/registrationPage';
import userProfile from './components/pages/userProfile';
import NewHomePage from './components/pages/NewHomePage';
import './index.css';

const store = configureStore();

render( 
	<Provider store={store}>
		<Router>
		
			<div>
				<Nav/>
				<Switch>
					<Route exact path='/' component={NewHomePage} />
					<Route exact path='/rooms/:id' component={Room} />
					<Route exact path='/register' component={Register} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/userprofile' component={userProfile}/>
					<Route exact path='/home' component={HomePage}/>
				</Switch>
			</div>
		</Router>
	</Provider>,
	document.getElementById('root')
);