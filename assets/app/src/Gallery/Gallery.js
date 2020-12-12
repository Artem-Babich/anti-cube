import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import UserGrid from '../Profile/UserGrid'
import Posts from '../Posts'
import { Modal } from '../Modal/Modal'

import './Gallery.css'
import CreatePostPanel from './CreatePostPanel'
import PostViewer from '../PostViewer/PostViewer'

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 293px);
  justify-content: center;
  gap: 20px;
  grid-auto-rows: 293px;

  ${({ isCascade }) =>
    isCascade &&
    css`
      grid-auto-rows: 200px;
      gap: 5px;
    `}
  @media (max-width: 990px) {
    gap: 5px;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: calc(33vw - 10px);
  }
`

class ImageElement extends Component {
  imageUrl = null

  constructor(props) {
    super(props)
    this.imageUrl = props.imageUrl
    // this.divStyle = {
    //   background: 'url(' + imageUrl + ') no-repeat center/150%',
    // }
  }

  render() {
    return (
      <div className="imageDivElement" onClick={this.props.onImageClick}>
        <img src={this.imageUrl} className={'imageElementStyle'} />
      </div>
    )
  }
}

export class Gallery extends Component {
  state = {
    isModalShown: false,
    postId: 1,
  }

  constructor() {
    super()
    this.showImageModal = this.showImageModal.bind(this)
  }
  isCascade = false
  showImageModal = (id) => {
    this.setState((state) => ({ isModalShown: true, postId: id }))
  }
  render() {
    return (
      <React.Fragment>
        <UserGrid />
        <CreatePostPanel></CreatePostPanel>
        <PhotoGrid isCascade={this.isCascade}>
          {Posts.map((post) => (
            <ImageElement
              imageUrl={post.imageUrl}
              postId={post.id}
              key={post.id}
              onImageClick={(e) => this.showImageModal(post.id)}
            ></ImageElement>
          ))}
        </PhotoGrid>
        <Modal isModalShown={this.state.isModalShown}>
          <PostViewer postId={this.state.postId}></PostViewer>
        </Modal>
        {/*<PostEditForm></PostEditForm>*/}
      </React.Fragment>
    )
  }
}
