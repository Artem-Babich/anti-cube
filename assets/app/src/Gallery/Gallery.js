import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import UserGrid from '../Profile/UserGrid'
import Posts from '../Posts'
import { Modal } from '../Modal/Modal'

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

const LinkGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`

const TabLink = styled(Link)`
  text-decoration: none;
  color: #ccc;
  text-transform: uppercase;
  letter-spacing: 3px;
  ${({ selected }) =>
    selected &&
    css`
      color: black;
    `}
`

const ImageLink = styled(Link)`
  background: no-repeat center/150% url(/img/${({ index }) => index}.jpeg);
  :hover {
    opacity: 0.7;
  }
  ${({ isCascade }) =>
    isCascade &&
    css`
      background-size: cover;
      &:nth-of-type(2n) {
        grid-row-start: span 2;
      }
    `}
`

class ImageElement extends Component {
  constructor(props) {
    super(props)
    let imageUrl = props.imageUrl
    this.divStyle = {
      background: 'url(' + imageUrl + ') no-repeat center/150%',
    }
  }
  render() {
    return (
      <div
        className="imageDivElement"
        style={this.divStyle}
        onClick={this.props.onImageClick}
      ></div>
    )
  }
}

export class Gallery extends Component {
  state = {
    isModalShown: false,
    postId: 0,
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
        <Modal postId={this.state.postId} isModalShown={this.state.isModalShown}></Modal>
      </React.Fragment>
    )
  }
}
