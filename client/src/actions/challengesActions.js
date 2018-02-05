export function getChallenges() {
	// const challenges = fetch(`${process.env.API_HOST}/api/challenges`)
// const challenges = fetch(`${"http://localhost:3001"}/api/challenges`)
const challenges = fetch(`${"https://codenector.herokuapp.com"}/api/challenges`)

		.then(res => res.json() )
		.then(res => res )
		.catch(err => console.log(err));
		return { type: "GET_CHALLENGES", payload: challenges }
}

// export function getChallenges() {
// 	return {
// 		type: 'GET_CHALLENGES',
// 		payload: {
// 			request:{
// 				url:'http://localhost:3001/api/challenges'
// 			}
// 		}
// 	};
// }