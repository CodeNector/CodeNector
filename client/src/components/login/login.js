import React, { Component } from "react";
import HomePage from '../pages/HomePage';
import API from "../utils/API";
import { Button, Form, FormGroup, Label, Input, FormText, Container} from 'reactstrap';
import { loginUser } from "../../actions/userActions";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Login extends Component {
    // Setting the initial values of this.state.username and this.state.password
    state = {
        username: "",
        password: "",
        areFieldsPopulated: false,
        isLoginSuccessful: false,
        isCredentialsWrong: false
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
        this.setState({
          areFieldsNotPopulated: false,
          isCredentialsWrong: false
        });

        //the fields are not populated then we need to show an error message.  
        if(!this.state.username || !this.state.password){
          this.setState({
            areFieldsNotPopulated: true
          })
          console.log("missing fields");
        } else {

          API.submitLogin({
            //put value from fields here. 
            username: this.state.username,
            password: this.state.password,
          })
          .then(res => {
            console.log("response from server at login.");
            // TODO add code to redirect 
            console.log(res)
  
            // other stuff to make login true. 
            if(res && res.isLoginSuccessful){
              console.log("successful login form login page.")
              this.props.onSuccessfullLogin(res.user);
              this.setState({
                isLoginSuccessful: true
              })
            } else {
              this.setState({
                isCredentialsWrong: true
              });
            }
            
          })
          .catch(err => console.log(err));
        }
  };

  render() {
    const homePage = (<HomePage />);
    const loginForm = (
      <Container>
        <Form>
        {this.state.areFieldsNotPopulated ? <div className="errorMsg"> Please enter a user name and password </div>  :  null}
        {this.state.isCredentialsWrong ? <div className="errorMsg"> Login unsuccessful. Please verify that username and paswword are correct.  </div>  :  null}
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
          <Button onClick={this.handleFormSubmit} href="/">Login</Button>
        </FormGroup>
          
        </Form>
      </Container>
      );

      return this.state.isLoginSuccessful ? homePage : loginForm 
  }
}

const mapStateToProps = (state, ownProps) => {
  return {user: state.currentUser.user};
  
};

const mapDispatchToProps = dispatch => {
	return {onSuccessfullLogin: (user) => {
    dispatch(loginUser(user))
  }}
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);