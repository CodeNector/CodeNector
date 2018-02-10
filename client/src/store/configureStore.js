import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import ReduxPromise from 'redux-promise';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

const client = axios.create({
	baseURL: 'http://localhost:3001/api',
	method: 'get',
	response: 'json'
});

export default function configureStore(initialState) {
	return createStore(
		rootReducer,
		initialState,
		applyMiddleware(
			ReduxPromise,
			axiosMiddleware(client)
		),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);
}