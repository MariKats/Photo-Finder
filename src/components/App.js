import React, { Component } from 'react';
import SearchBar from '../containers/search_bar';
import PhotoList from '../containers/photo_list';
import './App.css';

class App extends Component {
  constructor(props){
  	super(props);
  	this.state = { id: "" };
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2 style={{fontFamily: 'Special Elite', fontSize: '2em'}}>Welcome to Photo-Finder.</h2>
          <SearchBar />
        </div>
          <PhotoList />
      </div>
    );
  }
}

export default App;
