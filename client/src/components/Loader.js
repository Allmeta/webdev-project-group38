import React, {Component} from 'react'
import {fetchMovies, fetchNextPage, updatePage} from '../actions/MovieActions'
import {Icon} from 'semantic-ui-react'
import {connect} from "react-redux";

class Loader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: props.loading,
      searchHistory: props.searchHistory,
      nextPage: props.nextPage
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick () {
    this.props.updatePage();
    console.log(this.props.nextPage);
    this.props.fetchNextPage(this.props.searchHistory[this.props.searchHistory.length - 1], this.props.nextPage)
  }
  render () {
    return (
      <Icon name="arrow alternate circle down" color="grey" link size="huge" loading={this.props.loading} onClick={this.handleClick} />
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

function mapDispatchToProps(dispatch) {
  return {
    updatePage: () => dispatch(updatePage()),
    fetchNextPage: (title, page) => dispatch(fetchNextPage(title, page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loader)
