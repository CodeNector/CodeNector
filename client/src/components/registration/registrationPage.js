import React, { Component } from "react";
import HomePage from '../pages/HomePage';
import API from "../utils/API"


class Register extends Component {
    // Setting the initial values of this.state.username and this.state.password
    state = {
        username: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        isRegistered: false

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

    completeRegistration = () => {
      this.setState({
        isRegistered: true
      })
      //reroute here.
      //this.props.push('/');
    }


    // here we need to send the username and password to the server.. so that passport can ddo stuff with that. 
    handleFormSubmit = event => {
        event.preventDefault();
        //make post rquest here to /login
        API.submitRegister({
          //put value from fields here. 
          username: this.state.username,
          password: this.state.password,
          confirmpassword: this.state.confirmpassword,
          firstName: this.state.firstName,
          lastName: this.state.lastName
        })
        .then(function (res){
          console.log("registered!");
          // TODO add code to redirect 
          console.log("response.data: " + res.registrationSuccess); 
          if(res.registrationSuccess){
            // do stuff to after registration. 
            this.completeRegistration()
          } else {
            console.log (res); 
            // for each index of the array returned we need to display it so the user can see the error. 
            //this.showErrors()
          }

        })
        .catch(err => console.log(err));
    }; 

  render() {
    const homePage = (<HomePage />);
    const registrationForm = (<form>
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
      <input
        type="password"
        placeholder="confirmPassword"
        name="confirmpassword"
        value={this.state.confirmpassword}
        onChange={this.handleInputChange}
      />
      <input
        type="firstName"
        placeholder="firstName"
        name="firstName"
        value={this.state.firstName}
        onChange={this.handleInputChange}
      />
      <input
        type="lastName"
        placeholder="lastName"
        name="lastName"
        value={this.state.lastName}
        onChange={this.handleInputChange}
      />
      <button onClick={this.handleFormSubmit}>Register</button>
    </form>);

    return this.state.isRegistered ? homePage : registrationForm 
  }

}

export default Register;