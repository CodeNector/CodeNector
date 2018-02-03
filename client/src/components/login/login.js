import React, { Component } from "react";
import API from "../utils/API";
import { Button, Form, FormGroup, Label, Input, FormText, Container} from 'reactstrap';

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
  }
}

export default Login;