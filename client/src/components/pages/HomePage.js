import React, { Component } from 'react';
// import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as challengesActions from '../../actions/challengesActions';
import * as userActions from '../../actions/userActions';
import ChallengesList from '../ChallengesList';
import Nav from '../NavBar/nav'


class HomePage extends Component {
	componentDidMount() {
		if(this.props.challenges.length === 0) {
			this.props.actions.getChallenges();
		}
	}

	chooseUserName(userName) {
		this.props.actions.assignUserName(userName);
	}

	render() {
		return (
			<div>
				<Nav />
					
                <ChallengesList challenges={this.props.challenges} />
			
			</div>
		);
	}
}

const mapStateToProps = state => {
	console.log(state.currentUser);
	return { challenges: state.challenges, userName: state.currentUser};
};

const mapDispatchToProps = dispatch => {
	return { actions: bindActionCreators(Object.assign(userActions, challengesActions), dispatch)};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);