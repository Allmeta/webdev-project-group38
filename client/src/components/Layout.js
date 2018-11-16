import React, { Component } from 'react'
import styled from 'styled-components'
import Header from './Header'
import CardGroup from './CardGroup'
import Loader from './Loader'

const WrapperFlex = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Roboto,sans-serif;
  color: white;
  min-height: 100vh;
  margin:0;
  background:#edf1f5;
  
`
const StyledBody = styled.div`
  flex: 1;
  display:flex;
  flex-direction:column;
  align-items: center;
  height: 100%;
  padding: 108px 50px 50px 50px;
  @media (max-width: 860px){
    padding: 78px 20px 20px 20px;
  }
  >  * {
    margin-bottom:50px;
  }
`

class Layout extends Component {
  render () {
    return (
      <WrapperFlex>
        <Header />
        <StyledBody>
          <CardGroup/>
          <Loader/>
        </StyledBody>
      </WrapperFlex >
    )
  }
}

export default Layout
