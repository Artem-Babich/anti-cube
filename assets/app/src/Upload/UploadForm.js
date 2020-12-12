import React from 'react'

function UploadForm(uploadOptions) {
  return (
    <form method={'POST'} action={uploadOptions.bucketUrl} encType={'multipart/form-data'}>
      <input
        type={'hidden'}
        name={'key'}
        value={`${uploadOptions.userId}/${uploadOptions.uploadId}`}
      />
      <input type={'hidden'} name={'content-type'} value="image/jpeg" />
      <input type={'file'} name={'file'} />
      <input type={'submit'} value={'Upload'} />
      <input type={'hidden'} name={'x-obs-acl'} value={'public-read'} />
      <input type={'hidden'} name={'AccessKeyId'} value={uploadOptions.accessKeyId} />
      <input type={'hidden'} name={'policy'} value={uploadOptions.policy} />
      <input type={'hidden'} name={'signature'} value={uploadOptions.signature} />
    </form>
  )
}
export default UploadForm
