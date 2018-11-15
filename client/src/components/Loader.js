import React, { Component } from 'react'
import { fetchMovies, updateTitle, updatePage } from '../actions/MovieActions'
import { Icon, Popup } from 'semantic-ui-react'
import Waypoint from 'react-waypoint'

class Loader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      inView: true
    }
  }
  tryFetch () {
    if (this.state.loading) {
      this.setState({
        inView: true
      })
    }else {
      this.fetch()
    }
  }
  fetch () {
    this.setState({
      loading: true
    })
    console.log('Entered!')
  }
  doneFetch () {
    this.setState({
      loading: false
    })
    console.log('Left!')
  }
  render () {
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Waypoint
          onEnter={this.tryFetch.bind(this)}
          onLeave={this.doneFetch.bind(this)}
        />

        <Popup position="top center" content="Load more movies" trigger={
          <Icon name={this.state.loading ? 'circle notch' : 'arrow alternate circle down'}
            color="grey" link size="huge"
            loading={this.state.loading} onClick={this.fetch.bind(this)}/>
        }></Popup>
      </div>
    )
  }
}

export default Loader
