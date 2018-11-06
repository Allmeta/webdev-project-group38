import React, {Component} from 'react'
import SearchForm from './Components/SearchForm.js'

class App extends Component {
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
