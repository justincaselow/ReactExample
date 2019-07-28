import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

class BlooBlah extends Component {
  constructor(props) {
    super();
    this.state = {};
    // this.state = {value: this.props.defaultValue};
    this.handleChange = this.handleChange.bind(this);
    this.dragOverHandler = this.dragOverHandler.bind(this);
    this.dragLeaveHandler = this.dragLeaveHandler.bind(this);
    this.dropHandler = this.dropHandler.bind(this);
    this.readerOnLoad = this.readerOnLoad.bind(this);
  };
  handleChange(e) {
    this.setState({message: e.target.value});
  }

  doMagicalStuff = () => {
    alert(this.state.message);
  };

  dragOverHandler(ev) {
    console.log('Drop handler');
    this.setState(state => ({
      hover: true
    }));
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }

  dragLeaveHandler(ev) {
    console.log('Leave handler');
    this.setState(state => ({
      hover: false
    }));
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }

  dropHandler(e) {  
    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault();

    if (e.dataTransfer.files.length == 0) {
      console.log('Cannot process - no files');
      this.setState(state => ({
        dragStatus: "Could not process",
        hover: false
      }));
      return;
    }

    var file = e.dataTransfer.files[0];
    var reader = new FileReader();
    reader.onload = this.readerOnLoad;
    reader.readAsText(file);
  }

  readerOnLoad(e) {
    let contents = e.target.result;
    console.log(contents);
    this.setState(state => ({
      dragStatus: "SUCCESS - " + contents,
      hover: false
    }));
  }

  render() {
    let dragDropText = "Drag file here...";
    if (this.state.hover) {
      dragDropText = "Drop file here..."
    }
    if (this.state.dragStatus) {
      dragDropText += "\n" + this.state.dragStatus;
    }
    return (
      <div>
        <button className="btn btn-primary" type="button" onClick={this.doMagicalStuff}>
          Click me
        </button>
        <div id="dragDrop" className={this.state.hover ? 'hover' : 'nohover'}
                            onDrop={this.dropHandler}
                            onDragOver={this.dragOverHandler}
                            onDragLeave={this.dragLeaveHandler}>
          <p>{dragDropText}</p>
        </div>
      </div>
    )
  }
}
class Water extends Component {
  constructor(props) {
    super();
    this.state = {};
    this.setTemperature = this.setTemperature.bind(this);
  };
  setTemperature(e) {
    this.setState({currentTemp: e.target.value});
    // e.target.value is the text from our input
  }

  render() {
      // empty variable that will hold either "Liquid", "Solid", or "Gas"
      var stateOfMatter;
      // If temp is on/below freezing, it's a solid
      if (this.state.currentTemp <= 32) {
          stateOfMatter = 'Solid';

      // if temp is on/above boiling, it's a gas
      } else if (this.state.currentTemp >= 212) {
          stateOfMatter = 'Gas';

      // otherwise it's just a liquid
      } else {
          stateOfMatter = 'Liquid';
      }

      return (
          <div>
              <input onChange={this.setTemperature} value={this.state.currentTemp}></input>
              <p>At { this.state.currentTemp }°F, water is considered to be a "{ stateOfMatter }" state of matter.</p>
          </div>
      );
  }
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Water/>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <BlooBlah/>
        </header>
      </div>
    );
  }
}

export default App;