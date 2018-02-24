import React, { Component } from 'react';
// import HomePage from '../pages/HomePage';
import API from '../utils/API';
import { Button, Form, FormGroup, Label, Input, 
				 FormText, Container, Card, CardBody} from 'reactstrap';
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
		redirectTo: null
	}

	handleInputChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleFormSubmit = e => {
		e.preventDefault();
		console.log('handleSubmit');
		this.login(this.state.username, this.state.password);
		this.setState({
			redirectTo: '/home'
		})
	}
	
	login(username, password) {
		API.submitLogin(username, password)
			.then(res => {
				console.log(res, 'line 50');
				if(res.status === 200) {
					this.setState({
						loggedIn: true,
						user: res.data.user
					})
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
										<Button style={buttonStyle} href="/Home" onClick={this.handleFormSubmit}><FA name='sign-in-alt'/>{" "}Login</Button>
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

// const mapStateToProps = (state, ownProps) => {
// 	return {email: state.currentemail.email};
	
// };

// const mapDispatchToProps = dispatch => {
// 	return {
// 		onSuccessfullLogin: (email) => {
// 			dispatch(loginemail(email))
// 		}
// 	} 
// };


// export default connect(mapStateToProps, mapDispatchToProps)(Login);
export default Login;