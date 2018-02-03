import faker from 'faker';

const initialState = {
	challenges: [],
	currentUser: faker.internet.userName(),
	loggedin: false
};

export default initialState;