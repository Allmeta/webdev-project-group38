import React, { Component } from 'react'
import styled from 'styled-components'
import 'semantic-ui-css/semantic.min.css'
import 'react-sticky-header/styles.css'
import StickyHeader from 'react-sticky-header'

// import './assets/css/fonts.css';

const FirstRow = styled.div`
font-family: 'Roboto';
background-color:#28464B;
width: 100%;
font-size:2em;
color: white;
text-align:center;
padding-top:2%;
overflow:auto;
height: 75px;

`
// '${this.props.headerSize}
class StickyHeaderComp extends Component {
  render () {
    return (
      <StickyHeader

        // This is the sticky part of the header.
        header={
          <div className="Header_root">

            <FirstRow>
              <button style={{
                float: 'left', backgroundColor: 'transparent', position: 'absolute', top: 0, left: 0

              }}>
              </button>
                            My projects
            </FirstRow>
          </ div>
        }>
        <section>

        </section>
      </StickyHeader>

    )
  }
}

export default StickyHeaderComp
