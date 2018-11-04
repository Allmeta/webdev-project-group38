import React, { Component } from 'react'
import styled from 'styled-components'
import Logo from '../images/filmguru-logo2.jpg'
import SearchForm from './SearchForm.js'
import { Grid } from 'semantic-ui-react'



//The logo uses this hex-color: #4553F4

const HDiv = styled.div`
    padding: 0;
    margin: 0;
    background-color: #4553F4;
    font-size: 2em;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
   

    @media screen and (max-width: 500px) {
      flex-direction: column;
    }
`
const ImgStyle = styled.img`
max-width:100%;
max-height:100%;
float: left;
`
const SearchFields = styled.div`
height:100%;
width:72%;
`



class Header2 extends Component {

    render() {
        return (
            <HDiv>
                <Grid columns={2} divided>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <ImgStyle src={Logo} />
                        </Grid.Column>
                        <SearchFields>
                            <Grid.Column width={20}>
                                <SearchForm />
                            </Grid.Column>
                        </SearchFields>
                    </Grid.Row>
                </Grid>
            </HDiv>
        );
    }
}
export default Header2;