import React, {Component} from 'react'
import {fetchMovies, fetchNextPage, logSearch, updatePage, updateTitle} from '../actions/MovieActions'
import {Icon} from 'semantic-ui-react'
import {connect} from "react-redux";
import store from '../store/index'

class Loader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: props.loading,
      searchHistory: props.searchHistory,
      nextPage: props.nextPage
    }
  }
  render () {
    return (
      <Icon name="arrow alternate circle down" color="grey" link size="huge" loading={this.props.loading} onClick={this.props.handleClick} />
    )
  }
}

function mapStateToProps(state){
  return {
    loading: state.MovieReducer.loading,
    searchHistory: state.MovieReducer.searchHistory,
    nextPage: state.MovieReducer.nextPage
  }
}

function mapDispatchToProps (dispatch) {
  return {
    handleClick: () => {
      let searchHistory = store.getState().MovieReducer.searchHistory;
      let title = searchHistory[searchHistory.length - 1];
      let searchedTitle = ''
      if (title !== undefined) {
        searchedTitle = title['searchedTitle']
      }
      dispatch(updatePage());
      dispatch(fetchNextPage(searchedTitle));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loader)
