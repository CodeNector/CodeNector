import { userInfo } from "os";

export function assignUserName(userName) {
  return { type: 'ASSIGN_USERNAME', payload: userName }
}