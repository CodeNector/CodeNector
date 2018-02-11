import React from 'react';
import {Container, Card} from 'reactstrap';

const style = {
	color: '#DCEDFF',
	backgroundColor: '#343F3E',
	height: '100vh'
};

const Menu = props => {
	return (
		<Container style={style}>
			<div>
				{props.title}
			</div>
			{" "}
			<div>
				{props.description}
			</div>
		</Container>
	);
};

export default Menu;
