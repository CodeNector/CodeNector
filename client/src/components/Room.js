import React, { Component } from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import * as actions from '../actions/challengesActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client';
import { Button, Row, Col, Container } from 'reactstrap';
import FA from 'react-fontawesome'
import Sidebar from './Sidebar';
import 'brace/mode/javascript';
import 'brace/theme/solarized_dark';
import NewHomePage from "./pages/NewHomePage"
import API from './utils/API';


const socket = io();

const roomStyle={
	backgroundColor: "#DCEDFF"
}

const buttonStyle = {
	backgroundColor: '#505a5b',
	color: '#dcedff'
}

class Room extends Component {
	constructor(props) {
		super(props);
		this.state = {
			code: '',
			result: ''
		};
		socket.on('receive code', payload => {
			this.updateCodeFromSockets(payload);
		});
		
		socket.on('receive result', result => {
			this.updateResultFromSockets(result);
			console.log(result,"receive result")
		});

		
	} 

	evalCode = () => {
		// Quick Maffs 
		API.execute(this.state.code)
			.then(result => this.updateResultInState(result))
			.catch(err => console.log(err));
	}

	renderResult = () => {
		if(this.state.result !== '') {
			return <h1>this.state.result</h1>;
		}
	}

	componentDidMount() {
		if(this.props.challenge.id == undefined) {
			this.props.actions.getChallenges();
		} else {
			socket.emit('room', {room: this.props.challenge.id});
		}

	}

	compponentWillReceiveProps(nextProps) {
		socket.emit('room', {room: nextProps.challenge.id});
		const user = nextProps.currentUser;
		const users = [...this.state.users, user ];
		
		this.setState({users: users});
	}

	componentWillUnmount() {
		socket.emit('leave room', {
			room: this.props.challenge.id
		});
	}

	updateCodeInState = (newText) => {
		// console.log(newText);
		this.setState({ code: newText });
		socket.emit('coding event', {
			room: this.props.challenge.id,
			newCode: newText
		});
	}

	updateResultInState = (newResult) => {
		console.log(newResult)
		this.setState({ result: newResult });
		socket.emit('code execution', {
			result: newResult
		});
	}

	updateCodeFromSockets(payload) {
		this.setState({ code: payload.newCode });
	}
	
	updateResultFromSockets(payload){
		this.setState({ result: payload.result });
	}

	render() {
		const room = (<div style={roomStyle}>
			<Row>
				<Col xs='9'>
					<AceEditor 
						value={this.state.code}
						onChange={this.updateCodeInState}
						mode="javascript"
						theme="solarized_dark"
						width="76vw"
						height="85vh"
						// height="800px"
						fontSize="18px"
						// defaultValue="//No es6, sorry. 💣"
					/>
				<Button style={buttonStyle} className="float-right" onClick={this.evalCode}><FA name="play"/>{" "}Run Code</Button>
					
				</Col>
				<Col xs='3'>
					<Sidebar
						title={this.props.challenge.title}
						description={this.props.challenge.description}
						value={this.state.result}
						onChange={this.updateResultInState}
					/>
				</Col>
		</Row>
	</div>
			)

		const newHome = <NewHomePage/>

		return this.props.user.username ? room : newHome;
	}
}

const mapStateToProps = (state, ownProps) => {
	if(state.challenges.length > 0) {
		const challenge = state.challenges.filter(challenge => {
			return challenge.id == ownProps.match.params.id;
		})[0];
		return { 
			challenge: challenge,
			user: state.currentUser.user 
		};
	} else {
		return { 
			challenge: {title: '', description: ''},
			user: state.currentUser.user
		};
	}
};

const mapDispatchToProps = dispatch => {
	return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Room);