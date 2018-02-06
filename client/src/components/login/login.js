import React, { Component } from "react";
import HomePage from '../pages/HomePage';
import API from "../utils/API";
import { Button, Form, FormGroup, Label, Input, FormText, Container} from 'reactstrap';
import {loginUser} from "../../actions/userActions";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Login extends Component {
    // Setting the initial values of this.state.username and this.state.password
    state = {
        username: "",
        password: "",
        isLoginSuccessful: false
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
        .then(res => {
          console.log("response from server at login.");
          // TODO add code to redirect 
          console.log(res.user)
          this.props.onSuccessfulLogin(res.user);
        })
        .catch(err => console.log(err));

  };

  render() {
    console.log(this.props); 
    const homePage = (<HomePage />);
    const loginForm = (
      <Container>
        <Form>
          <FormGroup>
          <Label for="username">Username</Label>
          <Input
            type="email"
            placeholder="Username"
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange}
          />
          </FormGroup>
          <FormGroup>
          <Label for="password">Password</Label>
            
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <Button onClick={this.handleFormSubmit}>Login</Button>
        </FormGroup>
          
        </Form>
      </Container>
      );

      return this.state.isLoggedIn ? homePage : loginForm 
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("STATE FROM LOGIN : ", state)
  return {user: state.currentUser.user};
  
  // so for other pages we want to map state props to users liek we are here ^ 
  // then addd component will mpunt to the component - and in that function we will check for a user.. if user exists we are loggged in and we can show page - if not we will redirect to login page for now. 
};

const mapDispatchToProps = dispatch => {
	return {onSuccessfulLogin: (user) => {
    dispatch(loginUser(user))
  }}
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);