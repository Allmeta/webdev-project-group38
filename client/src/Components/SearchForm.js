import React from 'react'
import { connect } from 'react-redux'
import { Form, Header, Icon } from 'semantic-ui-react'
import { fetchMovies, logSearch, updateTitle } from '../actions/SearchFormActions'

function SearchForm(props) {
  return (
    <Form onSubmit={props.handleSubmit}>
      <Form.Group>
        <Form.Input onChange={props.handleChange} value={props.title} name='title' placeholder='Title search' width={3} />
        <Form.Button type='submit' width={2} icon={<Icon name='search' />} />
      </Form.Group>
    </Form>
  )
}

function mapStateToProps(state) {
  return ({
    title: state.title,
    genre: state.genre
  }
  )
}

function mapDispatchToProps(dispatch) {
  return (
    {
      handleChange: (e, { name, value }) => {
        dispatch(updateTitle(value))
      },
      handleSubmit: (event) => {
        const title = event.target.querySelectorAll('input[name="title"]')[0].value

        if (title !== '') {
          // We log the search only if it's non-empty.
          dispatch(logSearch(title))
        }

        dispatch(fetchMovies(title))
      }
    }
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)
