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

		this.state = {
			isLoggedin: false
		}

		this.toggle = this
			.toggle
			.bind(this);
		this.state = {
			isOpen: false
		};
	}

	componentWillMount = () => {
		// check if the state has a user in it.. if it does he is logged in. 
		if(!this.props.user.username){
			this.setState({
				isLoggedin: true
			})	
		} 
	}

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

		return this.isLoggedin ? NavbarLoggedin : NavbarNotLoggedin
	}
}

const mapStateToProps = (state, ownProps) => {
	return {user: state.currentUser.user};
	
  };
  
const mapDispatchToProps = () => {
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(navbarInstance);