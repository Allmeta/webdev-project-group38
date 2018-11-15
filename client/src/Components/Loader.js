import React, { Component } from 'react'
import { fetchMovies, updateTitle, updatePage } from '../actions/SearchFormActions'
import { Icon } from 'semantic-ui-react'

class Loader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
  }
  fetch () {
    this.setState({
      loading: true
    })
    fetchMovies()
    updatePage()
  }
  doneFetch () {
    this.setState({
      loading: false
    })
  }
  render () {
    return (
      <Icon name="arrow alternate circle down" color="grey" link size="huge" loading={this.state.loading} onClick={this.fetch.bind(this)} />
    )
  }
}

export default Loader
