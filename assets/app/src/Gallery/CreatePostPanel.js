import React from 'react'
import './CreatePostPanel.css'

const CreatePostPanel = function () {
  return (
    <div className={'CreatePostPanelContainer'}>
      <img className={'cameraIcon'} src={'icons/dslr-camera.svg'}></img>
      <span>Upload new photo</span>
    </div>
  )
}
export default CreatePostPanel
