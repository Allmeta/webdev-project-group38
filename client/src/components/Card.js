import React, { Component } from 'react'
import { Label } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import Comment from './CardComment'
import styled, { css } from 'styled-components'

const Card = styled.div`
  display:inline-grid;
  grid-template-columns: 185px auto;
  color:black;
  box-shadow: 0 2px 20px rgba(49,54,68,.3);
  background:#fafafa;
  min-height:265px;
  min-width:370px;
  box-sizing:border-box;
`
const CardImg = styled.div`
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  position:relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-image: url(${props => props.img});
`
const CardTitle = styled.div`
  background:rgba(0,0,0,.5);
  color:white;
  width:100%;
  padding:12px;
  text-align:center;
  font-size:14px;
`
const CardData = styled.div`
  position:relative;
`
const CardDate = styled.div`
  text-align:center;
  font-size:14px;
  padding:10px;
  background:#f1f3f7;
  color:#4553F4;
  font-weight:bold;
`
const CardExtra = styled.div`
  color:rgb(122,133,143);
  display: grid;
  font-size: 13px;
  grid-template-columns: repeat(2,1fr);
  background:#f6f8fb;
`
const CardSpan = styled.span`
  padding:8px;
  text-align:center;
  display:inline-block;
`
const CardDesc = styled.div`
  color:rgb(122,133,143);
  height:160px;
  background:#fafafa;
  line-height:15px;
  padding:4px 10px;
  font-size:12px;
  ${props => props.show === false
    ? css`
    overflow-y:auto;
  ` : css`
    overflow-y:hidden;
  `}
`
const CardBottom = styled.div`
  color: rgb(146,153,161);
  line-height: 13px;
  padding: 8px 10px;
  max-height:42px;
  text-align: center;
  width: 100%;
  background:#f6f8fb;
  ${props => !props.show && css`
  display:none;
  `}
`

class MovieCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      toggled: true
    }
    this.mouseIn = this.mouseIn.bind(this)
    this.mouseOut = this.mouseOut.bind(this)
  }
  mouseIn () {
    this.setState({
      toggled: false
    })
  }
  mouseOut () {
    this.setState({
      toggled: true
    })
  }

  render () {
    return (
      <Card onMouseEnter={this.mouseIn} onMouseLeave={this.mouseOut}>
        <CardImg img={this.props.img}>
          <CardTitle>{this.props.title}</CardTitle>
        </CardImg>
        <CardData>
          <CardDate>{this.props.date}</CardDate>
          <CardExtra>
            <CardSpan><Label content={this.props.language} icon="location arrow"/></CardSpan>
            <CardSpan><Label content={this.props.popularity} icon="star"></Label></CardSpan>
          </CardExtra>
          <CardDesc show={this.state.toggled}>{this.props.description}</CardDesc>
          <CardBottom show={this.state.toggled}>
            {this.props.genres.map((o) => <Label key={'' + o} content={o}/>)}
          </CardBottom>
          <CardBottom show={!this.state.toggled}>
            <Comment comment={this.props.comment}></Comment>
          </CardBottom>
        </CardData>
      </Card>

    )
  }
}

MovieCard.propTypes = {
  popularity: PropTypes.number.isRequired,
  description: PropTypes.string,
  img: PropTypes.string,
  title: PropTypes.string.isRequired,
  genres: PropTypes.array.isRequired,
  comment: PropTypes.string,
  date: PropTypes.string,
  language: PropTypes.string
}

export default MovieCard
