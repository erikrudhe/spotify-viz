import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
	color: 'green' 
};
let fakeServerData = {
	user:{
		name: ' Erik',
		playlists: [
		{
			name: 'My favorites',
			songs: [{name: 'Heeeej', duration: 1234},
			 		{name: 'heeeeej', duration: 1564}, 
			 		{name: 'hallo', duration: 1726} 
			 		]
		},
		{
			name: 'Discover weakly',
			songs: [{name: 'Song1', duration: 1234},
			 		{name: 'Song2', duration: 1564}, 
			 		{name: 'Song3', duration: 1726}]
		},
		{
			name: 'Playlist',
			songs: [{name: 'SongA', duration: 1234},
			 		{name: 'SongB', duration: 1564}, 
			 		{name: 'SongC', duration: 1726}]
			
		}
	   ]
	}
};



class Playlist extends Component{
	render(){
		return(
			<div style={{...defaultStyle, display: 'inline-block', width: "25%"}}>
				<img/>
				<h3> {this.props.playlist.name} </h3>
				<ul>
					{this.props.playlist.songs.map(song =>
						<li>{song.name}</li>
					)}
				</ul>
			</div>
		);
	}
}

class PlaylistCounter extends Component{
	render(){
		return(
			<div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
				<h2> {this.props.playlists.length} Playlists </h2>
			</div>
		);
	}
}

class HoursCounter extends Component{
	render(){

		let allSongs = this.props.playlists.reduce((songs, eachPlaylists)=> {
		return songs.concat(eachPlaylists.songs)
		}, [])
		 									//reduce the playlist to a list of songs, will run for every playlist 	
		let totalDuration = allSongs.reduce((sum,eachSong)=>{
			return sum + eachSong.duration;
		},0)

		return(
			<div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
				<h2>{Math.round(totalDuration/60)} Hours </h2>
			</div>

		);
	}
}

class Filter extends Component{
	render(){
		return(
			<div style={defaultStyle}>
				<input type="text" onkeyUp={event=> 
					this.props.onTextChange(event.target.value)}/>
			</div>
		);
	}
}

class App extends Component {
  constructor(){ // sets the state of the serverdata
  	super();      
  	this.state = {serverData: {}, 
  				  filterString: ''
  	}
  }	
  componentDidMount(){ // is called the first time the comonent is loaded and rendered
  	setTimeout(()=> {
  	this.setState({serverData: fakeServerData}); // 
  	 }, 2000 );
  }
  render() {
  	let playlistsToRender = this.state.serverData.user ? this.state.serverData.user.playlists
  	.filter(playlist =>
	  		playlist.name.toLowerCase().includes(
	  			this.state.filterString.toLowerCase())
	  	): []			 
    return (
      <div className ="App">
        {this.state.serverData.user ?
        <div>
          <h1> Välkommen     
          {this.state.serverData.user.name}  
        </h1>	
	    <PlaylistCounter playlists={playlistsToRender}/>      					  
	    <HoursCounter playlists={playlistsToRender}/>
	  	<Filter onTextChange={text => this.setState({filterString: text})}/>
	  	{this.state.serverData.user.playlists.map(playlist =>
	  		<Playlist playlist={playlist}/>

	  		)}
      </div> : <h1> Loading....</h1>
  		}
  	</div>
    );
  }
 }

export default App;
