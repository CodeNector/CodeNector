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

export default class navbarInstance extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this
			.toggle
			.bind(this);
		this.state = {
			isOpen: false
		};
	}
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}
	render() {
		return (
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
		);
	}
}