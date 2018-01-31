import React, { Component } from "react";
import API from "../utils/API";

class Login extends Component {
    // Setting the initial values of this.state.username and this.state.password
    state = {
        username: "",
        password: ""
    };
    
    // handle any changes to the input fields
    handleInputChange = event => {
        // Pull the name and value properties off of the event.target (the element which triggered the event)
        const { name, value } = event.target;

        // Set the state for the appropriate input field
        this.setState({
        [name]: value
        });
    };

    // here we need to send the username and password to the server.. so that passport can ddo stuff with that. 
    handleFormSubmit = event => {
        event.preventDefault();
        //make post rquest here to /login
        API.submitLogin({
          //put value from fields here. 
          username: this.state.username,
          password: this.state.password,
        })
        .then(function (res){
          console.log("response from server at login.");
          // TODO add code to redirect 
        })
        .catch(err => console.log(err));

  };

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={this.state.username}
          onChange={this.handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={this.state.password}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleFormSubmit}>Login</button>
      </form>
    );
  }
}

export default Login;