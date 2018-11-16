import React, { Component } from 'react'
import { Icon, Popup } from 'semantic-ui-react'
import Waypoint from 'react-waypoint'
import { fetchNextPage, updatePage } from '../actions/MovieActions'
import { connect } from 'react-redux'
import store from '../store/index'

class Loader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inView: true,
      loading: props.loading,
      searchHistory: props.searchHistory,
      nextPage: props.nextPage
    }
  }
  onLeave() {
    this.setState({
      inView: false
    })
  }
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Waypoint
          onEnter={this.props.handleClick}
          onLeave={this.onLeave.bind(this)}
        />

        <Popup position="top center" content="Load more movies" trigger={
          <Icon name={this.props.loading ? 'circle notch' : 'arrow alternate circle down'}
            color="grey" link size="huge"
            loading={this.props.loading} />
        }></Popup>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.MovieReducer.loading,
    searchHistory: state.MovieReducer.searchHistory,
    nextPage: state.MovieReducer.nextPage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleClick: () => {
      let searchHistory = store.getState().MovieReducer.searchHistory
      let title = searchHistory[searchHistory.length - 1]
      let searchedTitle = ''
      let filtercolor = store.getState().MovieReducer.toggleSort
      if (title) {
        searchedTitle = title['searchedTitle']
      }
      dispatch(updatePage())
      dispatch(fetchNextPage(searchedTitle, filtercolor))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loader)
