import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPhotoList } from '../actions';
import { Input, Form } from 'semantic-ui-react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: "" };
  }

  onInputChange(event) {
    this.setState({ term: event.target.value }, console.log(this.state.term));
  }

  onFormSubmit(event, data) {
    event.preventDefault();
    this.props.fetchPhotoList(this.state.term);
    this.setState({ term: "" });
  }

  render() {
    return (
      <Form onClick={this.onFormSubmit.bind(this)}>
        <Input
          size="large"
          type='text'
          icon={{ name: 'search', link: true }}
          placeholder='Search...'
          value={this.state.term}
          onChange={this.onInputChange.bind(this)}
          >
        </Input>
      </Form>
    );
  }
}

export default connect(null, { fetchPhotoList })(SearchBar);
