import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let defaultColor = 'green';
let defaultStyle = {
	color: defaultColor 
};

class Aggregate extends Component{
	render(){
		return(
			<div style={{...defaultStyle,display: 'inline-block', width: "25%"}}>
			 <h2 style={defaultStyle}> Mest lyssnade..</h2>
			 <img />
			 <h3>Playlist Name</h3>
			 <ul><li>Song 1</li><li>Song 2</li><li>Song 3</li></ul>

			</div>

		);
	}
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> Title </h1>
        <Aggregate/>
        <Aggregate/>
        <Aggregate/>
        <Aggregate/>
      </div>
    );
  }
}

export default App;
