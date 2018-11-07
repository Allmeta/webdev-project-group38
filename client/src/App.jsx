import React, { Component } from 'react'
import Layout from './Components/Layout.js'

class App extends Component {
  render () {
    return (
      <div>
        <div style={{ margin: 0 }}>
          <Layout style={{ marginLeft: '10vw', marginRight: '10vw' }}/>
        </div>
      </div>
    )
  }
}
export default App
