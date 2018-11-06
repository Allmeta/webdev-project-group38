import React, { Component } from 'react'
import Layout from './Components/Layout.js'
import SearchForm from './Components/SearchForm.js'

class App extends Component {
  render() {
    return (
      <div>
        <div style={{margin:0}}>
          <Layout/>
          <SearchForm />
        </div>
      </div>
    );
  }
}
export default App;
