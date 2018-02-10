import initialState from './initialState';

export default function currentUserReducer(state=initialState, action) {
	switch(action.type) {
	case 'LOGIN':
	console.log("PAYLOAD from reducer: ", action.payload);
		sessionStorage.setItem('user', JSON.stringify(action.payload));
		state.user = action.payload;
		break;

	// to logout add a case called logout that will delete the user from session storage. and update state. 
	case 'LOGOUT':
	console.log("the user hit the logout case THIS IS THE PAYLOAD: ", action.payload); 
	state.user = action.payload;
	break;

	//default 
	default:
		if(sessionStorage.user){
			state.user = JSON.parse(sessionStorage.user);
		}
	}
	return state;
}