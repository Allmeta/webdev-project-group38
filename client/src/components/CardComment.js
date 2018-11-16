import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Label, Icon, Input, Popup } from 'semantic-ui-react'

const CommentWrap = styled.div`
  text-align:left;
`

class Comment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comment: props.comment,
      commenting: false,
      previewComment: ''
    }
    this.toggleCommenting = this.toggleCommenting.bind(this)
    this.submitComment = this.submitComment.bind(this)
    this.handleMessage = this.handleMessage.bind(this)
  }
  handleMessage (e) {
    this.setState({ previewComment: e.target.value })
  }
  toggleCommenting () {
    this.setState({
      commenting: !this.state.commenting,
      previewComment: ''
    })
  }
  submitComment (e) {
    this.setState({
      comment: this.state.previewComment,
      previewComment: ''
    })

    this.toggleCommenting()
  }
  render () {
    return (
      <div>
        {this.state.commenting &&
        <div>
          <Input fluid
            placeholder="Comment"
            onChange={this.handleMessage}
            icon={{ name: 'cancel', link: true, onClick: () => this.toggleCommenting() }}
            action={{ icon: 'chat', onClick: () => this.submitComment() }}
            iconPosition="left"
            style={{ height: '42px' }}
          >
          </Input>
        </div>
        }

        {!this.state.commenting && !this.state.comment &&
        <Popup trigger={
          <Icon name="chat" link size="large" onClick={this.toggleCommenting}/>
        } content="Add comment"></Popup>
        }
        {!this.state.commenting && this.state.comment &&
        <CommentWrap>
          <Label
          >
            <Popup trigger={
              <Icon name="cancel" link size="large" onClick={this.toggleCommenting}/>
            } content="Change comment"></Popup>
            {this.state.comment}
          </Label>
        </CommentWrap>
        }
      </div>
    )
  }
}

Comment.propTypes = {
  comment: PropTypes.string
}
export default Comment
