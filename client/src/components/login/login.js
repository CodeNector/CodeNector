import React, { Component } from 'react';
import HomePage from '../pages/HomePage';
import API from '../utils/API';
import { Button, Form, FormGroup, Label, Input, 
				 FormText, Container, Card, CardBody} from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Nav from '../Nav/Nav';
import FA from 'react-fontawesome';

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
		
	

	render() {
		const homePage = (<HomePage />);
		const loginForm = (
			<Container class='justify-content-center'>
				<Card style={cardStyle}>
					<CardBody>
						<Container>
							<Form>
								<FormGroup>
									<Label for='email'>email</Label>
									<Input
										type='email'
										placeholder='email'
										name ='email'
										value={this.state.email}

									/>
								</FormGroup>
								<FormGroup>
									<Label for='password'>Password</Label>
									<Input
										type='password'
										placeholder='Password'
										name='password'
										value={this.state.password}
									/>
									<Button style={buttonStyle} href='/Home'><FA name='sign-in-alt'/>{' '}Login</Button>
								</FormGroup>
							</Form>
						</Container>
					</CardBody>
				</Card>
			</Container>
		);

	}
}

const mapStateToProps = (state, ownProps) => {
	return {email: state.currentemail.email};
	
};

const mapDispatchToProps = dispatch => {
	return {
		onSuccessfullLogin: (email) => {
			dispatch(loginemail(email))
		}
	} 
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);