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
flex:0.5;
max-width:100%;
max-height:90%;
align-self: left;
align-items:left; 
align-content: left;

`
const SearchDiv = styled.div`


`


class Header extends Component {

    render() {
        return (
            <div >
                <HDiv>
                    <div style={{ fontSize: 20, textAlign: 'center' }}> Search / sort components go in the Header component!: </div>

                    <ImgStyle src={Logo} />
                    <SearchDiv>
                        <SearchForm />
                    </SearchDiv>
                    <div style={{ fontSize: 20, textAlign: "center" }}>Search/sort components go here OR: </div>
                </HDiv>
            </div >
        );
    }
}
export default Header;