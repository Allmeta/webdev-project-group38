import React, { Component } from 'react'
import MovieCard from './Card.js'
import { fetchMovies } from '../actions/MovieActions'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {IMAGE_BASE} from "../api/constants";

const CardWrapper = styled.div`
  display:inline-grid;
  grid-template-columns: repeat(3,1fr);
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  margin: 0 auto;
  max-width: 80vw;
  
  @media (max-width: 1330px){
    grid-template-columns: repeat(2,1fr);
  }
  @media (max-width: 860px){
    grid-template-columns: repeat(1,1fr);
    max-width: 100vw;
    grid-row-gap: 20px;
  }
`

class CardGroup extends Component {
  constructor (props) {
    super(props)

    this.state = {
      filterItems: props.filterItems // provided by connect@mapStateToProps
    }
  }

  render () {
    const items = this.props.filterItems
    return (
      <CardWrapper>
        {items && items.map((o) =>
          <MovieCard
            img={IMAGE_BASE + o.poster_path}
            description={o.summary}
            title={o.title}
            popularity={Number(o.rating)}
            comment={o.comment}
            date={o.release_date}
            language={o.language}
            movie_id={o.movie_id}
          />
        )}
      </CardWrapper>
    )
  }
}

function mapStateToProps (state) {
  return {
    filterItems: state.MovieReducer.filterItems
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchMovies: (data) => dispatch(fetchMovies(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardGroup)
