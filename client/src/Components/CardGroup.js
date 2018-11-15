import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import MovieCard from './Card.js'
import { fetchMovies } from '../actions/SearchFormActions'
import { connect } from 'react-redux'

class CardGroup extends Component {
  constructor (props) {
    super(props)

    this.state = {
      filteredItems: props.filteredItems // provided by connect@mapStateToProps
    }
  }

  componentDidMount () {
    const { fetchMovies } = this.props
    fetchMovies()
  }

  render () {
    const image_base = 'https://image.tmdb.org/t/p/w500'

    const items = this.props.filteredItems

    return (
      <Card.Group centered>
        {console.log(items, 'CONSOLE LOG')}
        {items && items.map((o) =>
          <MovieCard
            key={o.movie_id}
            img={image_base + o.poster_path}
            description={o.summary}
            title={o.title}
            popularity={Number(o.rating)}
            // genres={o.genres.join(' ')}
            genres='WIP'
          />
        )}
      </Card.Group>
    )
  }
}

function mapStateToProps (state) {
  return {
    filteredItems: state.SearchFormReducer.filterItems
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchMovies: (data) => dispatch(fetchMovies(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardGroup)
