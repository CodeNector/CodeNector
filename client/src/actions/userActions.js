export function assignUserName(userName) {
  return { type: 'ASSIGN_USERNAME', payload: userName }
}

export function loginUser(user){
  return {type: 'LOGIN', payload: user}
}

//add a logout user funciton here that makes the payload an empty string?? 
export function logoutUser(){
  return {type: 'LOGOUT', payload: {}}
}