import { MiniUserGrid } from '../Profile/UserGrid'
import ProfileImage from '../Profile/ProfileImage'
import Posts from '../Posts'
import styled, { createGlobalStyle, css } from 'styled-components'
import { PostGrid, InfoGrid } from '../Modal/PostGrid'
import React, { useEffect, useState } from 'react'
import './PostViewer.css'

const PostViewer = function (props) {
  let [image, setImage] = useState(Posts[0])
  useEffect(() => {
    // image = Posts[parseInt(props.postId) - 1]
    image = getImageById(props.postId)
    setImage(image)
    console.log(image)
  }, [props.postId])
  const getImageById = (id) => {
    let posts = Posts.filter((p) => {
      return p.id == id
    })
    console.log(posts[0])

    if (posts.length > 0) return posts[0]
    return null
  }
  return (
    <div className={'containerDiv'}>
      <div className={'modalElement'}>
        <img className={'imageElement'} src={image.imageUrl} />
      </div>
      <div className={'postDetailsBlock'}>
        <InfoGrid>
          <MiniUserGrid>
            <ProfileImage mini />
            <h3>Grid Galery</h3>
          </MiniUserGrid>
          <div>
            <h2>Image number {image.title}</h2>
          </div>
          <div>45 Likes</div>
        </InfoGrid>
      </div>
    </div>
  )
}
export default PostViewer
