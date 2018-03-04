import React, { Component } from 'react';
// import HomePage from '../pages/HomePage';
import API from '../utils/API';
import { Button, Form, FormGroup, Label, Input, 
				 FormText, Container, Card, CardBody} from 'reactstrap';
import { loginUser } from "../../actions/userActions";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Nav from '../Nav/Nav';
import FA from 'react-fontawesome';
import { Redirect } from 'react-router-dom';

// eslint-disable-next-line

const buttonStyle = {
	marginTop: '5px',
	backgroundColor: '#505a5b',
};

const cardStyle = {
	marginTop: '5px',
	// backgroundColor: '#8f91a2',
	// width: '50vw'
};

class Login extends Component {
	state = {
		username: '',
		password:'',
		redirectTo: null,
		loggedIn: false
	}

	componentDidMount() {
		API.getUser()
			.then(res => console.log(res, 'line 37'))
	}

	handleInputChange = e => {
		// this.setState({
		// 	[e.target.name]: e.target.value
		// });

		const { name, value } = e.target;

		this.setState({
			[name]: value
		})
	}

	handleFormSubmit = e => {
		e.preventDefault();
		console.log('handleSubmit');
		this.login(this.state.username, this.state.password);
		// this.setState({
		// 	redirectTo: '/'
		// })
	}
	
	login(username, password) {
		API.submitLogin(username, password)
			.then(res => {
				console.log(res, 'line 50');
				if(!res) {
					console.log('problem logging in');

				// this.props.onSuccessfullLogin(res.data.user);
				} else {
					this.setState({
						loggedIn: true,
						user: res.data.user,
						redirectTo: '/'
					})
					console.log(res.data.user)
					
				}

			})
	}

		
	render() {
		if(this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<Container className='justify-content-center'>
					<Card style={cardStyle}>
						<CardBody>
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
										<Button style={buttonStyle} onClick={this.handleFormSubmit}><FA name='sign-in-alt'/>{" "}Login</Button>
									</FormGroup>
								</Form>
							</Container>
						</CardBody>
					</Card>
				</Container>
			);
		}
		
	}
}

const mapStateToProps = (state, ownProps) => {
	return {user: state.currentUser.user};
	
};

const mapDispatchToProps = dispatch => {
	return {
		onSuccessfullLogin: (user) => {
			dispatch(loginUser(user))
		}
	} 
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
// export default Login;