import React, { Component } from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import * as actions from '../actions/challengesActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client';
import { Button } from 'reactstrap';
import Result from './Result';
import 'brace/mode/javascript';
import 'brace/theme/solarized_dark';
import safeEval from 'notevil';

const socket = io();

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
		
	} 

	evalCode = () => {
		// Quick Maffs 
		try {
			const result = safeEval(this.state.code);
			this.setState({result: result});
			console.log(result);
		} catch (e) {
			console.log(e instanceof ReferenceError, "Not valid JavaScript");
		}

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
			// const user = this.props.currentUser;
			socket.emit('room', {room: this.props.challenge.id});
			// this.setState({users: users});
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
		this.setState({ code: newText });
		socket.emit('coding event', {
			room: this.props.challenge.id,
			newCode: newText
		});
	}

	updateCodeFromSockets(payload) {
		this.setState({ code: payload.newCode });
	}

	render() {
		return (
			<div className="container">
				{/* {console.log(this.props.challenge)} */}
				<h1>{this.props.challenge.title}</h1>
				<p>{this.props.challenge.description}</p>

				<AceEditor 
					value={this.state.code}
					onChange={this.updateCodeInState}
					mode="javascript"
					theme="solarized_dark"
					// width="800px"
					// height="800px"
					fontSize="14px"
				/>
				<Button onClick={this.evalCode}>Execute</Button>
				{/* {this.state.result} */
				<Result
					result={this.state.result}
				/>
			}
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	if(state.challenges.length > 0) {
		const challenge = state.challenges.filter(challenge => {
			return challenge.id == ownProps.match.params.id;
		})[0];
		return { challenge: challenge };
	} else {
		return { challenge: {title: '', description: ''}};
	}
};

const mapDispatchToProps = dispatch => {
	return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Room);