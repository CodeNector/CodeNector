import React, { Component } from 'react';
import { render } from 'react-dom';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/github';

class Room extends Component {


	render() {
		return (
			<AceEditor 
			/>
		);
	}
}

export default Room;