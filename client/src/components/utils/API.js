import axios from "axios";

export default {
  register: function() {
    return axios.get("/register");
  },

  login: function() {
    return axios.get("/login");
  },

  submitRegister: function(userInfo) {
    return axios.post("/register", userInfo);
  },

  submitLogin: function() {
    return axios.post("/login");
  }
};
