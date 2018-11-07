import React, { Component } from 'react'
import styled from 'styled-components'
import Header from './Header'
import { Card } from 'semantic-ui-react'
import MovieCard from './Card.js'
import imeg from '../images/elliot.jpg'

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
  render () {
    return (
      <WrapperFlex>
        <Header />
        <StyledBody>
          <Card.Group>
            <MovieCard
              description="Lots of random latin words that have little meaning but to fill out descriptions like these."
              title="Lorem Ipsum"
              img={imeg}
              popularity={1234}
              genres="Action, Adventure, Thriller"/>
            <MovieCard
              description="Lots of random latin words that have little meaning but to fill out descriptions like these."
              title="Ipsum Lorem"
              img={imeg}
              popularity={43.2}
              genres="Fantasy, Crime"/>

          </Card.Group>
        </StyledBody>
      </WrapperFlex >
    )
  }
}
export default Layout
