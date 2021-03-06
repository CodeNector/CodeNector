import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as challengesActions from '../../actions/challengesActions';
import * as userActions from '../../actions/userActions';
import ChallengesList from '../ChallengesList';
import Nav from '../NavBar/nav';
import NewHomePage from "./NewHomePage"
import Sidebar from '../Sidebar';

// import ChooseUserName from '../ChooseUserName';
// import { Container } from 'reactstrap';

// - danny - Added the link to link the login and register pages. 
import {Link} from 'react-router-dom';

class HomePage extends Component {
	componentDidMount() {
		if(this.props.challenges.length === 0) {
			this.props.actions.getChallenges();
		}
	}

	// chooseUserName(userName) {
	// 	this.props.actions.assignUserName(userName);
	// }

	render() {
		const Home = (
			<div className="container">
				{/* <ChooseUserName userName={this.props.userName} chooseUserName={this.chooseUserName.bind(this)} /> */}
				<ChallengesList challenges={this.props.challenges} />
{/* 				
					<ChooseUserName userName={this.props.userName} chooseUserName={this.chooseUserName.bind(this)} />
					<ChallengesList challenges={this.props.challenges} /> 

 					<Link className='nav-link'to='/userprofile'>go to profile</Link> */}

			</div>
		)

		const newHome = <NewHomePage/>

		return this.props.user.username ? Home : newHome;
	}
}

const mapStateToProps = state => {
	// console.log(state.currentUser`);
	// return { challenges: state.challenges, userName: state.currentUser};
	return { 
		challenges: state.challenges,
		user: state.currentUser.user
	 };
};

const mapDispatchToProps = dispatch => {
	return { actions: bindActionCreators(Object.assign(userActions, challengesActions), dispatch)};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);