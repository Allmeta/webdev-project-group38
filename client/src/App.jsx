import React, { Component } from 'react'
import SearchForm from './components/SearchForm.js'

class App extends Component {
  state = {
      cities: []
    }
  render() {
    return (
      <div>
        <ul>
          <li>This is a test</li>
          <li>This is a second test</li>
        </ul>
        <SearchForm />
      </div>
    );
  }
}
export default App;
