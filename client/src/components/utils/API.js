import axios from "axios";

export default {
  register: function() {
    return axios.get("/register");
  },

  login: function() {
    return axios.get("/login");
  },

  submitRegister: function(userInfo) {
    // this will respond with error if there was an error 
    // or respond with registered if registered. 
    return axios.post("/register", userInfo)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  },

  submitLogin: function() {
    return axios.post("/login");
  }
};
