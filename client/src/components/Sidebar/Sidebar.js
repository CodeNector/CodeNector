import React from 'react';
import {Container, Card, CardTitle, CardText, CardBody} from 'reactstrap';

const style = {
	color: '#DCEDFF',
	backgroundColor: '#343F3E',
	height: '100vh'
};

const cardStyle = {
	backgroundColor: '#505A5B'
};

const Menu = props => {
	return (
		<Container style={style}>
			<Card style={cardStyle}>
				<CardBody>
					<CardTitle>
						{props.title}
					</CardTitle>
					<CardText>
						{props.description}
					</CardText>
				</CardBody>
			</Card>
		</Container>
	);
};

export default Menu;
