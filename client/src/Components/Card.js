import React, { Component } from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import Comment from './CardComment'

class MovieCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      toggled: false
    }
    this.toggleDesc = this.toggleDesc.bind(this)
  }
  toggleDesc () {
    this.setState({
      toggled: !this.state.toggled
    })
  }

  render () {
    return (
      < Card color = "blue">
        {!this.state.toggled && < Image src = {this.props.img} onClick={this.toggleDesc}/>}
        < Card.Content onClick={this.toggleDesc}>
          < Card.Header >{this.props.title}</Card.Header >
          {!this.state.toggled && < Card.Meta >
            < span className = 'date' >  {
              this.props.genres
            } </span >
            {this.state.toggled}</Card.Meta >}
          {this.state.toggled && <Card.Description>{this.props.description}</Card.Description>}
        </Card.Content >
        <Comment comment={this.props.comment}/>
        < Card.Content extra >
          < span >
            < Icon name = 'star'/>  {
              this.props.popularity
            }
          </span >
        </Card.Content >
      </Card >
    )
  }
}
MovieCard.propTypes = {
  popularity: PropTypes.number.isRequired,
  description: PropTypes.string,
  img: PropTypes.string,
  title: PropTypes.string.isRequired,
  genres: PropTypes.string.isRequired,
  comment: PropTypes.string
}

export default MovieCard
