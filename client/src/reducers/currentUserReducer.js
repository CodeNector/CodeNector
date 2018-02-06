import initialState from './initialState';

export default function currentUserReducer(state=initialState, action) {
	console.log(action, state);
	switch(action.type) {
	case 'LOGIN':
		sessionStorage.setItem('user', JSON.stringify(action.payload));
		state.user = action.payload;
	// to logout add a case called logout that will delete the user from session storage. and update state. 
	default:
		if(sessionStorage.user){
			state.user = JSON.parse(sessionStorage.user);
		}
	}
	return state;
}