import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import ReduxPromise from 'redux-promise';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

const client = axios.create({
	baseURL: 'http://localhost:3001/api',
	method: 'get',
	response: 'json'
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default function configureStore(preloadedState) {
	return createStore(
		rootReducer,
		preloadedState,
		composeEnhancers(
			applyMiddleware(
				ReduxPromise,
				axiosMiddleware(client)
			)
		)
	);
}