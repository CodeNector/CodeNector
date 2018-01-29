import React, { Component } from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import * as actions from '../actions/challengesActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import 'brace/mode/javascript';
import 'brace/theme/solarized_dark';

class Room extends Component {
	constructor(props) {
		super(props);
		this.state = {code: ''};
		
	}

	componentDidMount() {
		if(this.props.challenge.id == undefined) {
			this.props.actions.getChallenges();
		} else {
			const user = this.props.currentUser;
			sessionStorage.setItem('currentUser', user);
			const users = [...this.state.users, this.props.currentUser];

			this.setState({users: users});

		}

	}

	compponentWillReceiveProps(nextProps) {
		const user = nextProps.currentUser;
		const users = [...this.state.users, user ];

		this.setState({users: users});
	}

	updateCodeInState(newText) {
		this.setState({ code: newText });
	}

	render() {
		return (
			<div>
				<h1>{this.props.challenge.title}</h1>
				<AceEditor 
					value={this.state.code}
					onChange={this.updateCodeInState.bind(this)}
					mode="javascript"
					theme="solarized_dark"
				/>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	if(state.challengers.length > 0) {
		const challenge = state.challenges.filter(challenge => {
			return challenge.id == ownProps.param.id;
		})[0];
		return { challege: challenge };
	} else {
		return { challenge: {title: '', description: '' }};
	}
};

const mapDispatchToProps = dispatch => {
	return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Room);