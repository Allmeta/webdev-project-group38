import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Header, Icon, Input, Button } from 'semantic-ui-react'
import { updateFilterQuery, changeSortToggle, fetchSortedMovies, fetchMovies } from '../actions/MovieActions'
import styled from 'styled-components'

function FilterForm(props) {
  function componentDidUpdate(prevfilterQuery) {
    console.log('GGGGS')
    if (this.props.filterQuery !== prevfilterQuery) {
      console.log(this.state.filterQuery, 'Filterquery updated!')
    }
  }
  return (
    <Form >
      <Form.Input onChange={props.handleChange}
        value={props.filterQuery}
        name='filterQuery'
        placeholder='Filter on movie synopsis...'
        action={{
          icon: props.toggleSort === 'green'
            ? 'sort numeric up'
            : 'sort numeric down',
          color: props.toggleSort,
          onClick: () => props.handleSortToggle(props.toggleSort, props.title),
          content: 'Rating'
        }}
      />

    </Form >
  )
}
/*

      <Button onClick={props.handleSortToggle} icon labelPosition='right' floated='right' color={props.toggleSort} >Rating
        {props.toggleSort === 'green' ? (<Icon size='big' name='sort numeric up' />) : (<Icon size='big' name='sort numeric down' />)}
      </Button>
*/

function mapStateToProps(state) {
  console.log(state.MovieReducer.toggleSort, 'state.MovieReducer.toggleSort')
  return ({
    filterQuery: state.MovieReducer.filterQuery,
    toggleSort: state.MovieReducer.toggleSort,
    title: state.MovieReducer.title
  }
  )
}

function mapDispatchToProps(dispatch, ownProps) {
  return (
    {
      // Update the filter text in store:
      handleChange: (e, { name, value }) => {
        dispatch(updateFilterQuery(value))
      },
      handleSortToggle: (toggleSort, title) => {
        dispatch(fetchSortedMovies(toggleSort, title))
      }
    }
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterForm)
