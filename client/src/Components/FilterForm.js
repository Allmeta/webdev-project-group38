import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Header, Icon, Input, Button } from 'semantic-ui-react'
import { updateFilterQuery, changeSortToggle } from '../actions/SearchFormActions'
import styled from 'styled-components'

const StyledField = styled.div`
right: 50 ;
`

function FilterForm (props) {
  function componentDidUpdate (prevfilterQuery) {
    console.log('GGGGS')
    if (this.props.filterQuery !== prevfilterQuery) {
      console.log(this.state.filterQuery, 'Filterquery updated!')
    }
  }

  return (
    <Form >
      <StyledField>
        <Form.Group >
          <Form.Input onChange={props.handleChange} value={props.filterQuery} name='filterQuery' placeholder='Filter on title...' width={3} />

          <Button onClick={props.handleSortToggle} icon labelPosition='right' floated='right' color={props.toggleSort} >Rating
            {props.toggleSort === 'green' ? (<Icon size='big' name='sort numeric up' />) : (<Icon size='big' name='sort numeric down' />)}
          </Button>
          <StyledField>
          </StyledField>
        </Form.Group>
      </StyledField>
    </Form >
  )
}

function mapStateToProps (state) {
  console.log(state.SearchFormReducer.toggleSort, 'state.SearchFormReducer.toggleSort')
  return ({
    filterQuery: state.SearchFormReducer.filterQuery,
    toggleSort: state.SearchFormReducer.toggleSort
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
