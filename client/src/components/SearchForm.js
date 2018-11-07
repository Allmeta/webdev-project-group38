import React from 'react'
import { connect } from 'react-redux'
import { Form, Icon, Header } from 'semantic-ui-react'
import {fetchMovies, updateGenre, updateTitle} from "../actions/SearchFormActions";

function SearchForm(props) {
  return (
    <Form loading={props.loading} onSubmit={props.handleSubmit}>
      <Header>Search</Header>
      <Form.Group>
        <Form.Input onChange={props.handleChange} value={props.title} name='title' placeholder='Title' width={3}/>
        <Form.Input onChange={props.handleChange} value={props.genre} name='genre' placeholder='Genre' width={3}/>
        <Form.Button type='submit' width={2} icon={<Icon name='search'/>}/>
      </Form.Group>
    </Form>
  )
}

function mapStateToProps(state){
  return({
      title: state.title,
      genre: state.genre,
      loading: state.loading
    }
  )
}

function mapDispatchToProps(dispatch) {
  return (
    {
      handleChange: (e, {name, value}) => {
        if (name === 'title') {
          dispatch(updateTitle(value));
        }
        else if( name === 'genre' ){
          dispatch(updateGenre(value));
        }
      },
      handleSubmit: () => {
        dispatch(fetchMovies());
      }
    }
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);