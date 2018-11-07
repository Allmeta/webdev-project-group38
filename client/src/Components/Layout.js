import React, { Component } from 'react'
import styled from 'styled-components'
import Header from './Header'
import { Card } from 'semantic-ui-react'
import MovieCard from './Card.js'
import axios from 'axios'

const WrapperFlex = styled.div`
  display: flex;
  background-color: #212733;
  flex-direction: column;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: white;
  height: 100vh;
  margin:0;
`
const StyledBody = styled.div`
  flex: 1;
  height: 100%;
  padding-top:20px;
  padding-left:10%;
  padding-right:10%;
`

class Layout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cards: []
    }
    this.image_base = 'https://image.tmdb.org/t/p/w500'
  }
  componentDidMount () {
    const instance = axios.create({
      baseURL: 'http://localhost:5025/api'
    })
    instance.get('/movies')
      .then((res) => {
        for (let i of res.data) {
          let str = '/genres/movie/id'.replace('id', i.movie_id)
          instance.get(str)
            .then((res2) => {
              i.genres = []
              for (let j of res2.data) {
                i.genres.push(j.name)
                // TODO set state
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
        this.setState({
          cards: res.data
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  render () {
    return (
      <WrapperFlex>
        <Header />
        <StyledBody>
          <Card.Group>
            {this.state.cards.map((o) =>
              <MovieCard
                key={o.movie_id}
                img={this.image_base + o.poster_path}
                description={o.summary}
                title={o.title}
                popularity={Number(o.rating)}
                // genres={o.genres.join(' ')}
                genres='WIP'
              />
            )}
            {/* <MovieCard
              description="Lots of random latin words that have little meaning but to fill out descriptions like these."
              title="Lorem Ipsum"
              img={imeg}
              popularity={1234}
              genres="Action, Adventure, Thriller"/> */}

          </Card.Group>
        </StyledBody>
      </WrapperFlex >
    )
  }
}
export default Layout
