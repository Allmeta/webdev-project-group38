import React, { Component } from 'react'
import styled from 'styled-components'
import Logo from '../images/filmguru-logo2.jpg'
import SearchForm from './SearchForm.js'

// The logo uses this hex-color: #4553F4

const HDiv = styled.div`
  display:flex;
  position:fixed;
  height: 58px;
  left:0;
  top:0;
  justify-content: center;
  width:100%;
  overflow-y:hidden;
  z-index:999;
  background-color: #4553F4;
  box-shadow: 0 4px 3px rgba(49,54,68,.3);
`
const HeadWrap = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  width:100%;
  margin-left:10%;
  margin-right:10%;
  
`
const ImgStyle = styled.img`
  width:200px;
  border-right:1px solid hsla(0,0%,93%,.16);
`
const SearchFields = styled.div`
  > * {
    margin-left:50px;
  }
  width:400px;
`

class Header extends Component {
  render () {
    return (
      <HDiv>
        <HeadWrap>
          <ImgStyle src={Logo} />
          <div></div>
          <SearchFields>
            <SearchForm />
          </SearchFields>
        </HeadWrap>
      </HDiv>
    )
  }
}
export default Header
