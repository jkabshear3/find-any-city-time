
import React from 'react';
import './App.css';
import Clock from './Clock'

//------------------------------------------------THIS.STATE-----------------------------------------------------

class App extends React.Component {
    constructor() {
      super()
      this.state = {
          isLoading: false,
          city: '',
          chosenCity: 'Cincinnati, OH',
          timeStamp: '',
          location: {
            lat: "42.349998",
            lng: "-83.059998"
          },
          timeZone: 'America/New_York',
          options: [
            {
              name: 'City, State'
            }
          ]
        }
    }
  
//-------------------------------------------------MAIN FUNCTION-------------------------------------------------
  onClick = () => {
    this.setState({isLoading: true})
      fetch("http://localhost:3030/cities", 
      {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          city: this.state.city
        })
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.length === 0) {
            this.setState({
              chosenCity: 'No such city...',
              isLoading: false
            })
          }
          else {
            this.setState({
                  options: data,
                  chosenCity: data[0].name,
                  location: {
                    lat: data[0].lat,
                    lng: data[0].lon
                  },
                  timeZone: data[0].tz,
                  timeStamp: new Date(),
                  isLoading: false
            })
          }
        })
  }

//------------------------------------------------EVENT FUNCTIONS------------------------------------------------

  /*onClick2 = () => {    <-----------------   click function test 
    console.log("p")
  }*/

  onTextChange = (event) => {
    this.setState({city: event.target.value})
  }

  onChosenCity = (event) => {
    this.setState({
      chosenCity: event.target.value
    })
    let filterArray = this.state.options.filter((item) => {
      if (item.name === event.target.value) {
        return item;
      }
    })
      this.setState({
        location: {
          lat: filterArray[0].lat,
          lng: filterArray[0].lon
        },
        timeZone: filterArray[0].tz
      })
  } 

  onKey = (event) => {
    if (event.key === "Enter") {
      this.onClick()
    }
  }

//----------------------------------------------RENDER FUNCTION-------------------------------------------------- 

  render() {
    let cityAndState = this.state.options.map((item, i) => {
       return <option key={i}>{item.name}</option>
    })
    return (
      
      <div className="App">
      <Clock className='timer' time={this.state.timeZone}/>
      {this.state.isLoading ? 
        <img style={{background: 'transparent'}} src={require('./loadGlobe.gif')} /> :
        <h1 className="city">{this.state.chosenCity}</h1>
      } <label>
        <input className='textBox' placeholder='enter any city..'type="text" onKeyPress={this.onKey}onChange={this.onTextChange}/>
        </label>
        <input className='button' type="button" value="Get Time" onClick={() => this.onClick(this.state.city)}/>
       <label> <select className="dropDown" onChange={this.onChosenCity}>
                {cityAndState}
              </select>
      </label>
        
      </div>
    );
  }
}

export default App;

//---------------------------------------------------NOTES---------------------------------------------------------------

//make search bar give options when user is typing

//make a loading circle when loading city

//read through tutorial OR find another lat/lon-to-map API 

