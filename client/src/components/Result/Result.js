import React from 'react';
import { Card, CardTitle } from 'reactstrap';

const ResultStyle = {
	width: '500px',
	height: '200px'
};

const ResultCard = props => {
	return (
		<div>
			<Card style={ResultStyle}>
				<CardTitle>
					<span>Output: </span>{props.value}
				</CardTitle>
			</Card>
		</div>
	);
};

export default ResultCard;