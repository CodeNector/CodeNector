import React, { Component } from 'react';
// import { Link } from 'react-router';
import { connect } from 'react-redux';
import HomePage from './HomePage';


class userProfile extends Component {
	state = {
        isLoggedin: false
    };

	componentDidMount() {

	}

	componentWillMount = () => {
		// check if the state has a user in it.. if it does he is logged in. 
		if(!this.props.user.username){
			//redirect 
			console.log("there is a user logged in. ");
			this.props.history.push("/");
			
		} 

		console.log(this.props.user);
	}

	render() {
		return (
			<div className="container">
				SUPER SECRET PAGE THAT YOU CAN ONLY SEE IF YOU ARE LOGGED IN. 
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
  return {user: state.currentUser.user};
  
  // so for other pages we want to map state props to users liek we are here ^ 
  // then addd component will mpunt to the component - and in that function we will check for a user.. if user exists we are loggged in and we can show page - if not we will redirect to login page for now. 
};

const mapDispatchToProps = () => {
};

export default connect(mapStateToProps, mapDispatchToProps)(userProfile);