import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Header, Icon, Input, Button } from 'semantic-ui-react'
import { updateFilterQuery } from '../actions/SearchFormActions'
import styled from 'styled-components'

const StyledField = styled.div`
right: 50 ;
`

function FilterForm(props) {
  function componentDidUpdate(prevfilterQuery) {
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
          <Button disabled icon labelPosition='right' floated='right' color='black' >year
            <Icon size='big' name=' sort numeric up' />
          </Button>
          <StyledField>
          </StyledField>
        </Form.Group>
      </StyledField>
    </Form >
  )
}

function mapStateToProps(state) {
  return ({
    filterQuery: state.SearchFormReducer.filterQuery
  }
  )
}

function mapDispatchToProps(dispatch) {
  return (
    {
      // Update the filter text in store:
      handleChange: (e, { name, value }) => {
        dispatch(updateFilterQuery(value))
      }
    }
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterForm)
