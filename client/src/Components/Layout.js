import React, { Component } from 'react'
import styled from 'styled-components'
import Header from './Header'

const WrapperFlex = styled.div`
display: flex;
background-color: #dddfd4;
flex-direction: column;
font-family: Verdana, Geneva, Tahoma, sans-serif;
font-size:2em;
color: white;
height: 100vh;
margin:0;
text-align: center;
`
const SearchBar = styled.div`
flex: 1;
background-color:#3fb0ac;
height: 20%;
width: 80%;
margin:0px auto;


`
const StyledBody = styled.div`
flex: 1;
background-color:#3fb0ac;
align-self: center;
width: 80%;
height: 100%;
margin:0px auto;
bottom: 0;
`
class Layout extends Component {
    render() {
        return (
            <WrapperFlex>
                <Header />
                <SearchBar> Search/sort components go here</SearchBar>
                <StyledBody>Body</StyledBody>
            </WrapperFlex >
        );
    }
}
export default Layout;
