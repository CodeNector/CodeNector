import React, { Component } from 'react';
import { Form, FormGroup } from 'reactstrap';

class ChooseUserName extends Component {
  state = {
    userName: '',
    editing: false
  }

  triggerChooseUserName(e) {
    e.preventDefault()
    this.props.chooseUserName(this.state.userName);
    this.setState({editing: false });
  }

  updateState(e) {
    this.setState({userName: e.target.value});
  }

  toggleEditing(e) {
    e.preventDefault();
    this.setState({editing: true});
  }

  editForm() {
    return (
      <Form>
        <FormGroup>
        </FormGroup>
      </Form>
    );
  }

  render() {
    return (
      <div>Nothing</div>
    )
  }
}

export default ChooseUserName;
