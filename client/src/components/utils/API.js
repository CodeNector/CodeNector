import axios from 'axios';

export default {
	register: function() {
		return axios.get('/register');
	},

	login: function() {
		return axios.get('/login');
	},

	submitRegister: function(userInfo) {
		// this will respond with error if there was an error
		// or respond with registered if registered.
		return axios.post('/register', userInfo)
			.then(function (response) {
				console.log(response.data);
				return response.data;
			})
			.catch(function (error) {
				console.log(error);
			});
	},

	submitLogin: function(LoginInfo) {
		return axios.post('/login', LoginInfo)
			.then(function (response) {
				console.log(response);
				console.log('hitting login');
				return response.data;
			})
			.catch(function (error) {
				console.log(error);
				console.log('error at login');
			});
	},

	Logout: function(LoginInfo) {
		return axios.get('/logout')
			.then(function (response) {
				console.log(response);
				console.log('hitting logout');
			})
			.catch(function (error) {
				console.log(error);
				console.log('error at logout');
			});
	},
	execute: function(code) {
		//In testing set url to localhost
		return axios.post('/api/sandbox', {code: code})
			.then(res => {
				console.log(res.data);
				return res.data;
			})
			.catch(err => console.log(err.message));
	}
};
