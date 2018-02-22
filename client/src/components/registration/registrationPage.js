import React, { Component } from "react";
import HomePage from '../pages/HomePage';
import API from "../utils/API"
import { Button, Form, FormGroup, Label, Input, FormText, Container, Card, CardBody, Col, Row } from 'reactstrap';
import "./registrationPage.css";
import FA from 'react-fontawesome';
import { Redirect } from 'react-router-dom';

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
        redirectTo: null
    };

    
    // handle any changes to the input fields
    handleInputChange = e => {
        // Set the state for the appropriate input field
        this.setState({
        [e.target.name]: e.target.value
        });
    };

    // here we need to send the username and password to the server.. so that passport can ddo stuff with that. 
    handleFormSubmit = e => {
        e.preventDefault();
        //make post rquest here to /login
        API.submitRegister({
          //put value from fields here. 
          username: this.state.username,
          password: this.state.password,
        })
        .then(response => {
          console.log("response" + response); 
          if (!response.data) {
            console.log('registered');
            this.setState({
              redirectTo: '/login'
            })
          } else {
            console.log(`You've already registered`)
          }
        })
        .catch(err => console.log(err));
    }; 

  render() {
    if(this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } return (
      <Container>
        <Card style={cardStyle}>
          <CardBody>
      <Form onSubmit={this.handleFormSubmit}>
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
        </Col>
        <Col xs='6'>
        <Label for="password">Confirm Password</Label>
        <Input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={this.state.confirmPassword}
          onChange={this.handleInputChange}
        />
        </Col>
        </Row>
        
        </FormGroup>
        {/* <FormGroup>
        <Label for="firstName">First Name</Label>
        <Input
          type="firstName"
          placeholder="First Name"
          name="firstName"
          value={this.state.firstName}
          onChange={this.handleInputChange}
        />
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
        </FormGroup> */}
        <Button type="submit"><FA name="wpforms"/>{' '}Register</Button>
      </Form>
      </CardBody>
      </Card>
      </Container>
    );
  }

}

export default Register;