import React, { Component } from 'react'
import styled from 'styled-components'
import Logo from '../images/filmguru-logo.jpg'

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
max-width:100%;
max-height:100%;
align-self: left;
align-items:left; 
align-content: left;

`


class Header extends Component {

    render() {
        return (
            <div >
                <HDiv>
                    <ImgStyle src={Logo} />
                    <p style={{ fontSize: 20 }}>Search/sort components go here OR: </p>
                </HDiv>
            </div>
        );
    }
}
export default Header;