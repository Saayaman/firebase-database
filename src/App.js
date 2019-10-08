import React from 'react';
import logo from './logo.svg';
import './App.css';
import { database } from './firebase';

class App extends React.Component {

  state = {
    name: '',
    position: '',
    email: '',
    //shcedule
    title: '',
    startingTime: '',
    endingTime: '',
  }

  updateState = (stateName, value) => {
    this.setState({
      [stateName]: value
    })
  }

  submitInput = () => {
    const { name, position, email } = this.state;
    database.ref('companies').child('-LqgNHqFg7rWSC0zWwXJ').child('employees').push(
      //1st parmeter
      {
        name: name,
        position: position,
        email: email,
      },
      //2nd parameter === callback function
      (err) => {
        if(err) {
          console.log('error', err);
          return
        }
        console.log('success!')
      }
    )
  }

  submitSchedule = async () => {
    const { title, startingTime, endingTime } = this.state;

    //Get these datees from selecting 
    const startingTimeDate = await new Date("October 10 2019 16:30").toLocaleString();
    const endingTimeDate = await new Date("October 10 2019 18:00").toLocaleString();

    console.log('startingtime', startingTimeDate);
    database.ref('companies').child('-LqgNHqFg7rWSC0zWwXJ').child('employees').child('-LqgQDpmfWbT5TGmFpZD').child('schedule/february2019/1').push(
      //1st parmeter
      {
        title,
        startingTime: startingTimeDate,
        endingTime: endingTimeDate,
      },
      //2nd parameter === callback function
      (err) => {
        if(err) {
          console.log('error', err);
          return
        }
        console.log('success!')
      }
    )
  }

  componentDidMount() {
    database.ref('companies').child('-LqgNHqFg7rWSC0zWwXJ').child('employees').child('-LqgQDpmfWbT5TGmFpZD').child('schedule').child('january2019').once('value').then((snapshot) => {

      snapshot.forEach(eachSchedule => {
        var childKey = eachSchedule.key;
        var childData = eachSchedule.val();
        console.log('key, value', {id: childKey, schedule: childData})
      });
      // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    }).catch(err => console.log('error!', err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <input placeholder='Name' onChange={(e) => this.updateState('name', e.target.value)} />
          <input placeholder="position"  onChange={(e) => this.updateState('position', e.target.value)} />
          <input placeholder="email"  onChange={(e) => this.updateState('email', e.target.value)} />
          <button onClick={this.submitInput}>Submit New Employee</button>
          <br/><br/>
          <input placeholder='Title' onChange={(e) => this.updateState('title', e.target.value)} />
          <input placeholder="Starting Time"  onChange={(e) => this.updateState('startingTime', e.target.value)} />
          <input placeholder="Ending Time"  onChange={(e) => this.updateState('endingTime', e.target.value)} />
          <button onClick={this.submitSchedule}>Submit New Time</button>
        </header>
      </div>
    );
  }

}

export default App;
