import React from 'react';
import { Link } from 'react-router-dom';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem, 
	Container
} from 'reactstrap';
import { connect } from 'react-redux';
import "./Nav.css"
import { logoutUser } from "../../actions/userActions";

class navbarInstance extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this
			.toggle
			.bind(this);
		this.state = {
			isOpen: false,
			isLoggedin: false
		};
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	logout() {
		// remove the user form the username 
		this.props.onSuccessfullLogOut();
	}


	render() {
		const NavbarNotLoggedin = (
			<div>
				<Navbar color='dark' dark expand='md'>
				<Container>
					<NavbarBrand href='/Home'>CodeNector</NavbarBrand>
					<NavbarToggler onClick={this.toggle}/>
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className='ml-auto' navbar>

							<NavItem>
								<Link className='nav-link'to='/login'>Login</Link>
							</NavItem>
							<NavItem>
								<Link className='nav-link'to='/register'>Register</Link>
							</NavItem>
						</Nav>
					</Collapse>
					</Container>
				</Navbar>
			</div>
		)
		const NavbarLoggedin = (
			<div>
				<Navbar color='dark' dark expand='md'>
				<Container>
					<NavbarBrand href='/Home'>CodeNector</NavbarBrand>
					<NavbarToggler onClick={this.toggle}/>
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className='ml-auto' navbar>
							<NavItem>
								<a className='nav-link' href="/" onClick={this.logout.bind(this)} >Logout</a>
							</NavItem>
						</Nav>
					</Collapse>
					</Container>
				</Navbar>
			</div>
		)

		return this.props.user.username ? NavbarLoggedin : NavbarNotLoggedin
	}
}

const mapStateToProps = (state, ownProps) => {
	return {user: state.currentUser.user};
	
  };
  
const mapDispatchToProps = dispatch => {
	return {onSuccessfullLogOut: () => {
		dispatch(logoutUser())
	  }}
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(navbarInstance);