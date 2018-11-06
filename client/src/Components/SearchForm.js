import React, { Component } from 'react'
import { Form, Icon, Header } from 'semantic-ui-react'
import styled from 'styled-components'



class SearchForm extends Component {
  state = {
    title: '',
    genre: '',
    submittedTitle: '',
    submittedGenre: '',
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  };

  handleSubmit = () => {
    const { title, genre } = this.state;
    this.setState({
      submittedTitle: title,
      submittedGenre: genre
    })
  };

  render() {
    const { title, genre } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Header>Search</Header>
        <Form.Group>
          <Form.Input onChange={this.handleChange} value={title} name='title' placeholder='Title' width={3} />
          <Form.Input onChange={this.handleChange} value={genre} name='genre' placeholder='Genre' width={3} />
          <Form.Button type='submit' width={2} icon={<Icon name='search' />} />
        </Form.Group>
      </Form>


    )
  }
}

export default SearchForm