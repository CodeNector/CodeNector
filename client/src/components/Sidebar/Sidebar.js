import React from 'react';
import { Container, Card, CardTitle, CardText, CardBody } from 'reactstrap';

const style = {
	color: '#DCEDFF', //Tertiary Color
	backgroundColor: '#343F3E', //Primary Color
	height: '100vh',
	fontFamily: `'Roboto Mono', monospace`,
	fontSize: '0.75rem'
};

const cardStyle = {
	backgroundColor: '#505A5B'  //Secondary Color
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

			<Card style={cardStyle}>
				<CardBody>
					<CardTitle>
						Result:
					</CardTitle>
					<CardText>
						{props.value}
					</CardText>
				</CardBody>
			</Card>


		</Container>
	);
};

export default Menu;
