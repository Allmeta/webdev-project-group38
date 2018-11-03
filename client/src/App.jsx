import React, { Component } from 'react'
import Layout from './Components/Layout';
import SearchForm from './components/SearchForm.js'

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
