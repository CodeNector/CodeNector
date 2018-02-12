import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';
import Nav from '../NavBar/nav';
import { Row, Col } from "reactstrap"
import "./newHomePage.css"
import FA from 'react-fontawesome';

// import ChooseUserName from '../ChooseUserName';
// import { Container } from 'reactstrap';

// - danny - Added the link to link the login and register pages. 
import {Link} from 'react-router-dom';


class NewHomePage extends Component {
	componentDidMount() {
	
    }

	render() {
		return (
            <Row id="bg">
                <Col> 
                    <div className="bgimg">
                        <div id="bgOverlay">
                            <h1 className="title text-center"><FA id="icon" name="terminal" /> CodeNector</h1>
                            <h3 className="text-center">Pair Programming, From Anywhere</h3>
                        </div>
                    </div>
                </Col>
            </Row>
		);
	}
}

const mapStateToProps = state => {
	// console.log(state.currentUser`);
	//return { challenges: state.challenges, userName: state.currentUser};
	return { challenges: state.challenges };
};

const mapDispatchToProps = dispatch => {
	
};

export default connect(mapStateToProps, mapDispatchToProps)(NewHomePage);