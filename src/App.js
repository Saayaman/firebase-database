import React from 'react';
import logo from './logo.svg';
import './App.css';
import { database } from './firebase';

class App extends React.Component {

  submitInput = () => {
    database.ref('students').push(
      //1st parmeter
      {
        firstname: 'Erika',
        lastname: 'Miwa',
        age: 17
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
    database.ref('students').once('value').then((snapshot) => {

      snapshot.forEach((eachStudent) => {
        var childKey = eachStudent.key;
        var childData = eachStudent.val();
        console.log('key, value', childKey, childData)
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
          <button onClick={this.submitInput}>Submit new user</button>
        </header>
      </div>
    );
  }

}

export default App;
