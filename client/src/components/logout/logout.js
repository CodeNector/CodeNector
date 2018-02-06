import React, { Component } from "react";
import API from "../utils/API";

class logout extends Component {
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

    // handle logout here. 
    handleButtonClick = event => {
        event.preventDefault();
        API.Logout();

  };

  render() {
    return (
        <button onClick={this.handleButtonClick}>logout</button>
    );
  }
}

export default logout;