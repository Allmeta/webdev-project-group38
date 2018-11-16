import React from 'react'
import {connect} from 'react-redux'
import {Form} from 'semantic-ui-react'
import {changeSortToggle, updateFilterQuery} from '../actions/MovieActions'

function FilterForm (props) {
  return (
    <Form >
      <Form.Input onChange={props.handleChange}
        value={props.filterQuery}
        name='filterQuery'
        placeholder='Filter on title...'
        action={{
          icon: props.toggleSort === 'green'
            ? 'sort numeric up'
            : 'sort numeric down',
          color: props.toggleSort,
          onClick: props.handleSortToggle,
          content: 'Rating'
        }}
      />

    </Form >
  )
}

function mapStateToProps (state) {
  return ({
    filterQuery: state.MovieReducer.filterQuery,
    toggleSort: state.MovieReducer.toggleSort
  }
  )
}

function mapDispatchToProps (dispatch) {
  return (
    {
      // Update the filter text in store:
      handleChange: (e, { name, value }) => {
        dispatch(updateFilterQuery(value))
      },
      handleSortToggle: () => {
        dispatch(changeSortToggle())
      }
    }
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterForm)
