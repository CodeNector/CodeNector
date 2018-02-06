export function assignUserName(userName) {
  return { type: 'ASSIGN_USERNAME', payload: userName }
}

export function loginUser(user){
  return {type: 'LOGIN', payload: user}
}