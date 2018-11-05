import React, { Component } from 'react'
import SearchForm from './Components/SearchForm.js'
import store from './store/'
import Provider from "react-redux/es/components/Provider";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <ul>
            <li>This is a test</li>
            <li>This is a second test</li>
          </ul>
          <SearchForm />
        </div>
      </Provider>
    );
  }
}
export default App;
