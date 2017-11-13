import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { addGuest, deleteGuest, getLuke } from './ducks/partyList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      text: e.target.value
    }, () => console.log(this.state.text))
  }

  handleClick() {
    this.props.addGuest(this.state.text);
    this.setState({
      text: ''
    })
  }

  render() {
    const partyList = this.props.partyList.map( (person, index) => {
      return <p onClick={() => this.props.deleteGuest(index)} key={index}>{person}</p>
    })
    return (
      <div className="App">
        <h1>Party List</h1>
        <input value={this.state.text} onChange={ this.handleChange } />
        <button onClick={ this.handleClick } >Add Guest</button>
        { partyList }
        <br/>
        <button onClick={() => this.props.getLuke()} className=''>Get Luke</button>
        <br/>
        {JSON.stringify(this.props.luke, null, 2)}
      </div>
    );
  }
}


function mapStateToProps(state) {
  // state parameter is the redux store state.
  // you can just return the state object, as seen below, to have the entire redux store
  // state merged to the props object for this component.

  // You can also choose to return an object with only certain parts of the state object.

  // Example: 
  //  return {
  //    list: state.partyList,
  //    lukeData: state.luke
  //  }
  return state;
}

// the second argument for the connect method is going to be an object. in the object you will put
// the action creators that you imported at the top of this file. you will use the 'connected' version of these action creators, now located in the this.props object of this component.
let decorator = connect(mapStateToProps, {addGuest, deleteGuest, getLuke});
let decoratedComponent = decorator(App);
export default decoratedComponent;

// Below is a common was to use the connect method. Notice the double invocation below. 
// This is the same as the code above.
// export default connect(mapStateToProps, {addGuest, deleteGuest, getLuke})(App)
