import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';

let defaultStyle = {
	color: 'green' 
};

class Header extends Component{
	render(){
		let name = this.props.user
  return(
    <header className="navbar">
      <h3>Welcome to spotify-viz {}</h3>
    </header>
		)
	}
}

class Artist extends Component{
	render(){
		let artist = this.props.artist;
		return(
			<div style={{...defaultStyle, display: 'inline-block', width:"25%", height:"25%" }}>
				<h2>{artist.name}</h2>
				<img src={artist.imageUrl} style={{width: "160px", height:'160px', borderRadius:'60%', backgroundPosition:'50%'}} />			
			</div>
			)
		}
	}

class Artist1 extends Component{
	render(){
		let artist1 = this.props.artist;			
		return(
			<div style={{...defaultStyle, display: 'inline-block', width:"25%", height:"25%" }}>
				<h2>{artist1.name}</h2>
				<img src={artist1.imageUrl} style={{width: "160px", height:'160px', borderRadius:'60%', backgroundPosition:'50%'}} />			
			</div>
			)
		}
	}
class Artist2 extends Component{
	render(){
		let artist2 = this.props.artist;			
		return(
			<div style={{...defaultStyle, display: 'inline-block', width:"25%", height:"25%" }}>
				<h2>{artist2.name}</h2>
				<img src={artist2.imageUrl} style={{width: "160px", height:'160px', borderRadius:'60%', backgroundPosition:'50%'}} />			
			</div>
			)
		}
	}
	


class Track extends Component{
	render(){
		let track = this.props.track;		
		return(
				<div style={{...defaultStyle, display: 'inline-block', width: "25%"}}>
				<h2>{track.name}</h2>
				</div>
				)
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
  	let parsed = queryString.parse(window.location.search);
  	let accessToken = parsed.access_token;
  
  	if(!accessToken)
  		return;

  	fetch('https://api.spotify.com/v1/me',{
  		headers: { 'Authorization': 'Bearer ' + accessToken }
  	}).then(response => response.json())
  		.then(data => this.setState({ 
  			user:{
  				name: data.display_name}
				},console.log(data)))
		
	//Collect top artists for the last 4 weeks 			
  	let urlArtist = new URL('https://api.spotify.com/v1/me/top/artists'),
  			params = {limit: 8,
  					  time_range: 'short_term'
  			}
  	Object.keys(params).forEach(key=> urlArtist.searchParams.append(key, params[key]))			
  	fetch(urlArtist,{
  		headers: { 'Authorization': 'Bearer ' + accessToken }
  	}).then(response => response.json())
	  	.then(data => this.setState({
  				artists: data.items.map(item =>{
  				console.log(data.items);
  				return{
  					name: item.name,
  					imageUrl: item.images[0].url,
  					genres: [],
  					imageHeight: item.images.height
  				}
  			})
		  }))
	//Collect top artists for the last 6 months 			
	let urlArtist1 = new URL('https://api.spotify.com/v1/me/top/artists'),
	params1 = {limit: 8,
			  time_range: 'medium_term'
			}
		Object.keys(params1).forEach(key=> urlArtist1.searchParams.append(key, params1[key]))			
		fetch(urlArtist1,{
		headers: { 'Authorization': 'Bearer ' + accessToken }
		}).then(response => response.json())
		.then(data => this.setState({
				artists1: data.items.map(item =>{
				console.log(data.items);
				return{
					name: item.name,
					imageUrl: item.images[0].url,
					genres: [],
					imageHeight: item.images.height
				}
			})
		}))
	//Collect top artists for the last year 			
	let urlArtist2 = new URL('https://api.spotify.com/v1/me/top/artists'),
	params2 = {limit: 8,
			  time_range: 'long_term'
			}
		Object.keys(params2).forEach(key=> urlArtist1.searchParams.append(key, params2[key]))			
		fetch(urlArtist2,{
		headers: { 'Authorization': 'Bearer ' + accessToken }
		}).then(response => response.json())
		.then(data => this.setState({
				artists2: data.items.map(item =>{
				console.log(data.items);
				return{
					name: item.name,
					imageUrl: item.images[0].url,
					genres: [],
					imageHeight: item.images.height
				}
			})
		}))

	let urlTracks = new URL('https://api.spotify.com/v1/me/top/tracks'),
  			paramsTracks = {limit: 8,
  					  		time_range: 'short_term'
  			}
  	Object.keys(paramsTracks).forEach(key=> urlTracks.searchParams.append(key, paramsTracks[key]))			
  	fetch(urlTracks,{
  		headers: { 'Authorization': 'Bearer ' + accessToken }
  	}).then(response => response.json())
	  	.then(data => this.setState({
  				tracks: data.items.map(item =>{
  				console.log(data);
  				return{
  					name: item.name
  				}
  			})
  		})) 

  }
  render() {
  	// Checks if user and playlist exist, then sets the state otherwise return empty array
  	let artistsToRender = 
  		this.state.user &&
  		this.state.artists
  		? this.state.artists.filter(artist =>
	  			artist.name.toLowerCase().includes(
	  			 this.state.filterString.toLowerCase()))
		  : []

	let artistsToRender1 = 
  		this.state.user &&
  		this.state.artists1
  		? this.state.artists1.filter(artist =>
	  			artist.name.toLowerCase().includes(
	  			 this.state.filterString.toLowerCase()))
		  : []

	let artistsToRender2 = 
  		this.state.user &&
  		this.state.artists1
  		? this.state.artists1.filter(artist =>
	  			artist.name.toLowerCase().includes(
	  			 this.state.filterString.toLowerCase()))
  		: []		  		  

  	let track = 
  		this.state.user &&
  		this.state.tracks
  		? this.state.tracks.filter(track =>
	  			track.name.toLowerCase().includes(
	  			 this.state.filterString.toLowerCase()))
  		: []
  		
    return (
      <div className ="App">
        {this.state.user ?
        <div>
					<Header/>
		  <h1>      
			Hi, {this.state.user.name}  
        </h1>
	  	<h1>Your most listened artists: </h1>
	  	<div className = "Month">
	  		<div className ="Artists">
	  			<h2>This month</h2>
	  			  	 {artistsToRender.map((artist,index) =>
        					<Artist artist ={artist} /> 
        	        	)}
				<h2>Last six months</h2>
				{artistsToRender1.map((artist,index) =>
        					<Artist1 artist ={artist} /> 
        	        	)}
				<h2>Last year</h2>
				{artistsToRender2.map((artist,index) =>
        					<Artist2 artist ={artist} /> 
        	        	)}						
	  		</div>
	  		<div className = "Tracks">
	  			<h1>Your most listened tracks</h1>
	  		</div>	
	  	</div>

	  	 {track.map((track) =>
        	 <Track track = {track}/>

        	)}
      </div> :  <button onClick={() => 
		   window.location = window.location.href.includes('localhost')
		   ? 'http://localhost:8888/login'
		   : 'https//spotify-viz-backend.herokuapp.com/login' 
		
		}
      		style={{padding: '28px', 'fontSize': '58px', 'marginTop':'235px' }}>Sign in with Spotify</button> 
  		}
  	</div>
    );
  }
 }

export default App;
