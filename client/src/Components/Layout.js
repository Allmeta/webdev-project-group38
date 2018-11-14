import React, {Component} from 'react'
import styled from 'styled-components'
import Header from './Header'
import CardGroup from "./CardGroup";

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
  padding-top:10%;
  padding-left:10%;
  padding-right:10%;
`

class Layout extends Component {
  render() {
    return (
      <WrapperFlex>
        <Header />
        <StyledBody>
          <CardGroup/>
        </StyledBody>
      </WrapperFlex >
    )
  }
}

export default Layout
