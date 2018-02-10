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

	// componentWillMount = () => {
	// 	// check if the state has a user in it.. if it does he is logged in. 
	// 	console.log(this.props.user.username);
	// 	console.log("Thi is the logged in state. " + this.state.isLoggedin);
	// 	if(this.props.user.username){
	// 		console.log("there is a user and we are changing the state. ")
	// 		this.setState({
	// 			isLoggedin: true
	// 		})	
	// 	} 

	// 	console.log("Thi is the logged in state after the setstate. " + this.state.isLoggedin);
	// }

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}
	render() {
		const NavbarNotLoggedin = (
			<div>
				<Navbar color='dark' dark expand='md'>
				<Container>
					<NavbarBrand href='/'>CodeNector</NavbarBrand>
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
					<NavbarBrand href='/'>CodeNector</NavbarBrand>
					<NavbarToggler onClick={this.toggle}/>
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className='ml-auto' navbar>
							<NavItem>
								<Link className='nav-link'to='/logout'>Logout</Link>
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
  
const mapDispatchToProps = () => {
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(navbarInstance);