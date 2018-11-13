import React from 'react'
import { connect } from 'react-redux'
import { Form, Header, Icon, Input } from 'semantic-ui-react'
import { updateFilterQuery } from '../actions/FilterFormActions'
import styled from 'styled-components'

const StyledField = styled.div`
right: 50;
`
function FilterForm(props) {
  return (
    <Form onSubmit={props.handleFilterSubmit}>
      <StyledField>
        <Form.Group>
          <Form.Input onChange={props.handleChange} value={props.filterQuery} name='filterQuery' placeholder='Title search' width={3} />
          <StyledField>
            <Form.Button type='submit' width={2} icon={<Icon name='search' />} />
          </StyledField>
        </Form.Group>
      </StyledField>
    </Form>
  )
}

function mapStateToProps(state) {
  return ({
    filterQuery: state.filterQuery
  }
  )
}

function mapDispatchToProps(dispatch) {
  return (
    {
      // Update the filter text in store:
      handleChange: (e, { name, value }) => {
        dispatch(updateFilterQuery(value))
      },
      handleFilterSubmit: (event) => {
        const filterQuery = event.target.querySelectorAll('input[name="filterQuery"]')[0].value

        if (filterQuery !== '') {
          // We log the search only if it's non-empty.
        }

        dispatch(updateFilterQuery(filterQuery))
      }
    }
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterForm)
