import axios from 'axios';

export default {
	register() {
		return axios.get('/register');
	},

	login() {
		return axios.get('/login');
	},

	submitRegister(userInfo) {
		// this will respond with error if there was an error
		// or respond with registered if registered.
		return axios.post('/auth/signup', userInfo)
	},

	submitLogin(username, password) {
		console.log(username, password);
		return axios.post('/auth/login', { username, password })
			.then(function (response) {
				console.log(response, 'response');
				console.log('hitting login');
				return true;
			})
			.catch(function (error) {
				console.log(error);
				console.log('error at login');
			});
	},

	Logout(LoginInfo) {
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
	execute(code) {
		//In testing set url to localhost
		return axios.post('/api/sandbox', {code: code})
			.then(res => {
				console.log(res.data);
				return res.data;
			})
			.catch((err) => {
				console.log(err.message);
				// res.status(500).send('something went wrong!');
			});
	}
};
