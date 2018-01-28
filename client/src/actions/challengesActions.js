export function getChallenges() {
  // const challenges = fetch(`${process.env.API_HOST}/api/v1/challenges`)
const challenges = fetch(`${"https://code-pair-api.herokuapp.com"}/api/v1/challenges`)
    .then(res => res.json() )
    .then(res => res )
    .catch(err => console.log(err));
    return { type: "GET_CHALLENGES", payload: challenges }
}