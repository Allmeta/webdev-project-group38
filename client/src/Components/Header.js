import React, { Component } from 'react'
import styled from 'styled-components'

const HDiv = styled.div`
    flex: 1;
    background-color: #F48358;
    font-size: 2em;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    height: 200px;
    align-items: center;
    align-content: center;

    @media screen and (max-width: 500px) {
      flex-direction: column;
    }
`


class Header extends Component {
    render() {
        return (
            <div >
                <HDiv>MovieMate
                    <p>Search/sort components go here OR: </p>
                </HDiv>
            </div>
        );
    }
}
export default Header;