import React, { Component } from 'react'
import styled from 'styled-components'
import Logo from '../images/filmguru-logo2.jpg'
import SearchForm from './SearchForm.js'


//The logo uses this hex-color: #4553F4

const HDiv = styled.div`
    flex: 1;
    background-color: #4553F4;
    font-size: 2em;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    height: 200px;
   

    @media screen and (max-width: 500px) {
      flex-direction: column;
    }
`
const ImgStyle = styled.img`
width: 30%;
flex:0.5;
max-width:100%;
max-height:90%;
float: left;

`
const SearchDiv = styled.div`
width: 70%;
position: absolute;
float: right;
right:-100px;
top:100;
padding-top:40;


`


class Header extends Component {

    render() {
        return (
            <div >
                <HDiv>

                    <ImgStyle src={Logo} />
                    <SearchDiv> <SearchForm /> </SearchDiv>
                </HDiv>
            </div >
        );
    }
}
export default Header;