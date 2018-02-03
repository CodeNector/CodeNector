import React, { Component } from "react";
import API from "../utils/API"
import { Button, Form, FormGroup, Label, Input, FormText, Container} from 'reactstrap';

class Register extends Component {
    // Setting the initial values of this.state.username and this.state.password
    state = {
        username: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
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
          type="text"
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
        {/* <Label for="password">Password</Label> */}
        <Input
          type="password"
          placeholder="Confirm Password"
          name="confirmpassword"
          value={this.state.confirmpassword}
          onChange={this.handleInputChange}
        />
        </FormGroup>
        <FormGroup>
        <Label for="firstName">First Name</Label>
        <Input
          type="firstName"
          placeholder="firstName"
          name="firstName"
          value={this.state.firstName}
          onChange={this.handleInputChange}
        />
        </FormGroup>
        <FormGroup>
        <Label for="lastName">Last Name</Label>
        <Input
          type="lastName"
          placeholder="lastName"
          name="lastName"
          value={this.state.lastName}
          onChange={this.handleInputChange}
        />
        </FormGroup>
        <Button onClick={this.handleFormSubmit}>Register</Button>
      </Form>
      </Container>
    );
  }
}

export default Register;