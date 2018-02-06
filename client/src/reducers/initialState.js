import faker from 'faker';

const initialState = {
	challenges: [],
	currentUser: faker.internet.userName(),
	loggedin: false,
	user: {}
};

export default initialState;