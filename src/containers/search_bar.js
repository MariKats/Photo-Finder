import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPhotoList } from '../actions';
import { Input, Button } from 'semantic-ui-react';

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
      <Input
        type='text'
        placeholder='Search...'
        value={this.state.term}
        onChange={this.onInputChange.bind(this)}
        action>
        <input />
        <Button type='submit' onClick={this.onFormSubmit.bind(this)}>Search</Button>
      </Input>
    );
  }
}

export default connect(null, { fetchPhotoList })(SearchBar);
