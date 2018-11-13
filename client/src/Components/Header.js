import React, { Component } from 'react'
import styled from 'styled-components'
import Logo from '../images/filmguru-logo2.jpg'
import SearchForm from './SearchForm.js'
import 'react-sticky-header/styles.css'
import StickyHeader from 'react-sticky-header'
import FilterForm from './FilterForm.js'

// The logo uses this hex-color: #4553F4

const HDiv = styled.div`
  position:relative;
  padding: 0;
  padding-left:10%;
  padding-right:10%;
  margin: 0;
  background-color: #4553F4;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
color: white;
text-align:center;
height: 110px;


  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`
const ImgStyle = styled.img`
  width:200px;
  float: left;
`
const SearchFields = styled.div`
  float:left;
  position:absolute;
  width:1000px;
  left:40%;
  top:50px;
`
const FilterField = styled.div`
  float:right;
  position:absolute;
  width:1000px;
  left:60%;
  top:50px;
`

class Header extends Component {
  render () {
    return (
      <StickyHeader

        // This is the sticky part of the header.
        header={
          <div className="Header_root">
            <HDiv>
              <ImgStyle src={Logo} />
              <SearchFields>
                <SearchForm />
              </SearchFields>
              <FilterField>
                <FilterForm />
              </FilterField>

            </HDiv>
          </ div>
        }>
        <section>

        </section>
      </StickyHeader >
    )
  }
}
export default Header
