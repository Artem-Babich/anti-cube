import * as React from 'react'

const Gallery = () => {
  const images = [
    `https://user-images.githubusercontent.com/5055654/101983495-5e4b1900-3c8c-11eb-8a84-44f824c586e3.jpeg`,
    `https://user-images.githubusercontent.com/5055654/101983497-5ee3af80-3c8c-11eb-9948-0189ef4e3efa.jpeg`,
    `https://user-images.githubusercontent.com/5055654/101983498-5f7c4600-3c8c-11eb-89fe-1366956183ba.jpeg`,
    `https://user-images.githubusercontent.com/5055654/101983499-6014dc80-3c8c-11eb-825c-e72b99f2dd1a.jpeg`,
    `https://user-images.githubusercontent.com/5055654/101983500-6014dc80-3c8c-11eb-91f9-7b24fc4ed8e0.jpeg`,
    `https://user-images.githubusercontent.com/5055654/101983501-60ad7300-3c8c-11eb-9ede-71d96bdcf02f.jpeg`,
    `https://user-images.githubusercontent.com/5055654/101983502-60ad7300-3c8c-11eb-8f9f-aa8648f0fde7.jpeg`,
  ]

  return (
    <React.Fragment>
      <div className="photo-grid">
        {images.map((imageUrl, index) => (
          <div
            className="image-element"
            key={index}
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
          >
            <div className="image-element__shadow">
              <div className="image-element__info">
                <div className="image-element__heart" />
                <div className="image-element__likes">15</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  )
}

//
// export class Gallery extends Component {
//   state = {
//     isModalShown: false,
//     postId: 0,
//   }
//   constructor() {
//     super()
//     this.showImageModal = this.showImageModal.bind(this)
//   }
//   isCascade = false
//   showImageModal = (id) => {
//     this.setState((state) => ({ isModalShown: true, postId: id }))
//   }
//   render() {
//     return (
//       <React.Fragment>
//         <UserGrid />
//         <PhotoGrid isCascade={this.isCascade}>
//           {Posts.map((post) => (
//             <ImageElement
//               imageUrl={post.imageUrl}
//               postId={post.id}
//               key={post.id}
//               onImageClick={(e) => this.showImageModal(post.id)}
//             ></ImageElement>
//           ))}
//         </PhotoGrid>
//         <Modal postId={this.state.postId} isModalShown={this.state.isModalShown}></Modal>
//       </React.Fragment>
//     )
//   }
// }

export default Gallery
