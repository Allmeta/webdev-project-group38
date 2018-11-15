import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Input } from 'semantic-ui-react'

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
      commenting: !this.state.commenting
    })
  }
  submitComment (e) {
    this.setState({
      comment: this.state.previewComment,
      previewComment: ''
    })
    console.log(this.state.previewComment)

    this.toggleCommenting()
  }
  render () {
    return (
      <div>
        {this.state.commenting &&
        <Input focus placeholder="Comment..." onChange={this.handleMessage}>
          <Icon name="delete" color="blue" link circular inverted size="large" onClick={this.toggleCommenting}></Icon>
          <input />
          <Icon name="chat" color="blue" link circular inverted size="large" onClick={this.submitComment}></Icon>
        </Input>
        }

        {!this.state.commenting && !this.state.comment &&
        <Button animated="fade" icon attached='bottom' color="blue" onClick={this.toggleCommenting}>
          <Button.Content visible>
            <Icon name = 'add' circular color="blue" style={{ background: 'white' }}></Icon>
          </Button.Content>
          <Button.Content hidden>
            Comment on movie
          </Button.Content>
        </Button>}
        {!this.state.commenting && this.state.comment &&
        <Button animated="fade" attached="bottom" color="orange" onClick={this.toggleCommenting}>
          <Button.Content visible>{this.state.comment}</Button.Content>
          <Button.Content hidden>Change comment?</Button.Content>
        </Button>
        }
      </div>
    )
  }
}

Comment.propTypes = {
  comment: PropTypes.string
}
export default Comment
