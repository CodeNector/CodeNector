import React, { Component } from "react";
import HomePage from '../pages/HomePage';
import API from "../utils/API"
import { Button, Form, FormGroup, Label, Input, FormText, Container, Card, CardBody, Col, Row } from 'reactstrap';
import "./registrationPage.css";
import FA from 'react-fontawesome'

const buttonStyle = {
  marginTop: '5px',
  backgroundColor: '#505a5b',
}

const cardStyle = {
  marginTop: '5px',
  // backgroundColor: '#8f91a2',
  // width: '50vw'
}

class Register extends Component {
    // Setting the initial values of this.state.username and this.state.password
    state = {
        username: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        isRegistered: false,
        errors: [],
        firstnameError: false,
        lastnameError: false, 
        passwordError: false,
        passwordMatchError: false,
        usernameError: false,
        userExistsError: false
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
      // add post to also login the user as well. 
    }

    loopThroughTheErrors = (errors) => {
      this.setState({
        errors: errors,
        firstnameError: false,
        lastnameError: false, 
        passwordError: false,
        passwordMatchError: false,
        usernameError: false,
        userExistsError: false
      });
      console.log(errors.userExists); 
      //this will makee it so the error for unique users display. 
      if(errors.userExists){
        console.log("DOES USER EXISTS? " + this.state.userExistsError);
        this.setState({
          userExistsError: true
        })
      } else {
        for(var i=0; i<errors.length; i++){
          if(errors[i].param === "username"){
            this.setState({
              usernameError: true
            })
          } 
  
          if(errors[i].param === "password"){
            this.setState({
              passwordError: true
            })
          }
  
          if(errors[i].param === "confirmpassword"){
            this.setState({
              passwordMatchError: true
            })
          }
  
          if(errors[i].param ==="firstName"){
            this.setState({
              firstnameError: true
            })
          }
  
          if(errors[i].param ==="lastName"){
            this.setState({
              lastnameError: true
            })
          }
        }
      }
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
        .then(res => {
          console.log("response.data: " + res); 
          if(res.registrationSuccess){
            // do stuff to after registration. 
            this.completeRegistration();
          } else {
            // for each index of the array returned we need to display it so the user can see the error. 
            this.loopThroughTheErrors(res);
          }
        })
        .catch(err => console.log(err));
    }; 

  render() {
    const homePage = (<HomePage />);
    const registrationForm = (
      <Container>
        <Card style={cardStyle}>
          <CardBody>
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
        {this.state.usernameError ? <div className="errorMsg"> The username field is required </div>  :  null}
        </FormGroup>
        <FormGroup>
        <Row>
        <Col xs='6'>
        <Label for="password">Password</Label>
        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={this.state.password}
          onChange={this.handleInputChange}
        />
        {this.state.passwordError ? <div className="errorMsg"> The password field is required </div>  :  null}
        </Col>
        <Col xs='6'>
        <Label for="password">Confirm Password</Label>
        <Input
          type="password"
          placeholder="Confirm Password"
          name="confirmpassword"
          value={this.state.confirmpassword}
          onChange={this.handleInputChange}
        />
        </Col>
        </Row>
        
        {this.state.passwordMatchError ? <div className="errorMsg"> The passwords must match. </div>  :  null}
        </FormGroup>
        <FormGroup>
        <Label for="firstName">First Name</Label>
        <Input
          type="firstName"
          placeholder="First Name"
          name="firstName"
          value={this.state.firstName}
          onChange={this.handleInputChange}
        />
        {this.state.firstnameError ? <div className="errorMsg"> The first name field is required </div>  :  null}
        </FormGroup>
        <FormGroup>
        <Label for="lastName">Last Name</Label>
        <Input
          type="lastName"
          placeholder="Last Name"
          name="lastName"
          value={this.state.lastName}
          onChange={this.handleInputChange}
        />
        {this.state.lastnameError ? <div className="errorMsg"> The last name field is required </div>  :  null}
        </FormGroup>
        {this.state.userExistsError ? <div className="errorMsg"> Username already in use. Please create a unique username. </div>  :  null}
        <Button onClick={this.handleFormSubmit}><FA name="wpforms" />{' '}Register</Button>
      </Form>
      </CardBody>
      </Card>
      </Container>
      );

    return this.state.isRegistered ? homePage : registrationForm 
  }

}

export default Register;