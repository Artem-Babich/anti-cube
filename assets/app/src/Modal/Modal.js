import React, { Component } from 'react'

import './Modal.css'

export class Modal extends Component {
  modalClassName = 'modalNotVisible'

  componentWillReceiveProps(props) {
    this.modalClassName = props.isModalShown ? '' : 'modalNotVisible'
    // this.divImageStyle = {
    //   background: 'url(' + this.image.imageUrl + ') no-repeat center/150% ',
    // }
  }
  onFadeClick = () => {
    this.setState({ isModalShown: false })
    this.modalClassName = 'modalNotVisible'
  }

  constructor(props) {
    super(props)
    this.state = {
      isModalShown: false,
      postId: 1,
    }
    // this.divImageStyle = {
    //   background: 'url(' + this.image.imageUrl + ') no-repeat center/150% ',
    // }
  }

  render() {
    return (
      <div className={this.modalClassName}>
        <div className={'modalWindow'}>{this.props.children}</div>
        <div onClick={this.onFadeClick} className={'modalFade'}></div>
      </div>
    )
  }
}
