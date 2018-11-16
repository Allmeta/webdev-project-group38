import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'semantic-ui-react'
import { updateFilterQuery, fetchSortedMovies } from '../actions/MovieActions'

// This component is found in the header of the webpage, and consists of a text input and a button
function FilterForm(props) {
  return (
    <Form >
      <Form.Input onChange={props.handleChange}
        value={props.filterQuery}
        name='filterQuery'
        placeholder='Filter on movie synopsis...'
        /* The following conditional statement makes the "sortbutton" change color according to the state
         * in the redux store:
         */
        action={{
          icon: props.toggleSort === 'green'
            ? 'sort numeric down'
            : 'sort numeric up',
          color: props.toggleSort,
          onClick: () => props.handleSortToggle(props.toggleSort, props.title),
          content: 'Rating'
        }}
      />
    </Form >
  )
}

function mapStateToProps(state) {
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
      /* Sorting: Calling the action creator in MovieActions.js which calls the REST API for sorted films
       *The toggleSort prop is carried on to the action creator in order to get the correct movie order
       *from the API
       */
      handleSortToggle: (toggleSort, title) => {
        dispatch(fetchSortedMovies(toggleSort, title))
      }
    }
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterForm)
