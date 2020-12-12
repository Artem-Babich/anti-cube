import React from 'react'
import UploadForm from '../Upload/UploadForm'

function PostEditForm() {
  let uploadOptions = {
    bucketUrl: 'http://anti-cube-images.obs.ru-moscow-1.hc.sbercloud.ru',
    userId: 'qqq',
    uploadId: 'E3241028637',
    accessKeyId: 'W4K80VIC9E3GPQU4ETHH',
    policy:
      'eyJleHBpcmF0aW9uIjoiMjAyMC0xMi0zMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W3sieC1vYnMtYWNsIjoicHVibGljLXJlYWQifSx7Ingtb2JzLXNlY3VyaXR5LXRva2VuIjoiZ1F0eWRTMXRiM05qYjNjdE1ZaU5JRFo5WkQySWp1MnJjRVN6ZTcwR19ld2JKdlcxUlJGV05kVkczOV9sWktLamlqZERIOTBsVEdPaEpnbDVlNlhJV2k0V3YwRG9aMmhNWU1xOFRRODMwQTdJYlBiNUI3cHdHWnpsN2ltNGI5YkZHdWg0VlJybC1HS3pUcUxxdTM3akMwM0NjcVZHWThBMlRETVo1VGNHRUV6Wlg5c3prOUdTRGRvNUp5TEQ4NjNwZmI3NmQxbGhDOXF0NFdZWFR2cVhDZlQ1Nm5xN1ZaYmV5d29ORk1RTTB3Zmc5YXpnNXNwTGZHMG1RNHppSnlMa3RBNjZLWVBGNmRRcVAtZzFYVWYxWGh2YUtGZkZnTmhBOXhYQmdXY08tRm9WbWdCV21KZ0RyQkFGMHdkbTJuMmtlMEFYck9HNzgyQ2tWUjB1Tjc4YWhfQy1PWjdZa2tud1VjY0lIMFNNZjYtd0ZvVHBPQmpoMEdDWEJWVEJrcXlRWE5SVGdDRjZmWnJ3U1VSczRicGdIRHZIMDlUSmJHeU1manc0VHhDSUUzdDdSRXFtcGJ1OE9ibHVCX3FKUUVvdk9yYUNmS3FjcEo5ckpXM0tMaTVGZVhmSTlUOWN1VDBQQXhFeWdkdjZBTmRCa3QycFhuY05YVU9VaEd0ZkdnSFJaaWZkam1WbXRVSVNGUld3Ty1MY1VEcFBQZW1rWkRybzR5ZWJ3M3pyVWFiZHhPaGFSeXVQRkwtU2FfUDAwc3hvdDR6UFBTNmRpN0IwWWd0N04yYkhueTJOaGNtZF9RaENPQVkwbXRLbmtVWUxYbGo1SEZLSjc3QzlSTjBXVFFFRENHVzIzd3A4NkotMVIxUW9hcmxZSkZGRmtPVU41YmNLUDNwZFdIX1BTem1la0w0em5ySmJvb3k4VXRUOTBKa29welZlRkttWEI4VGFDeWRobmJ5NnRqNTluM25tR2JzLUVvQmFOTXVXZHdFU1Y5RVVud0o4SDFBTE53bGdDQkxPN2g3aFNEa2xUQnJRQ3cwWGFydmNFX2pIUExxbnljSVBkb1hkbzhLbHh0c1J4NG92WXMwRjFVY0dFamVMNm1GUVVmQzRNdWdwSFZiamE2alp5S2xyeXVVeDl2VlFpZm9XNlVSTUE4MFY0QVdPUlZMUHpLSjdaRXJMLThnZW9vMnN3bUhUWVpsX2tsVjJaZ0FpbXhSYkt2V3g5TmJlOG5nYU5xaFpvVU9yWnpWYUN1VVYyT2hqUm04MklhYW91Y3J1R0xoWHVkekRpMERFS0dpT3NnbGhXdnJFdVk1M2tZcFdPTGxYY0tjRHNzMzM3SW5VZElGTUNEd0pzRi0yTGlzRmZ0WVNGN2xXNmtVN0s2TWRmc1YyU29uSlNLbjZwampVVVFRQnNES0g4U3RxTDZDR2FCOEpXbUxVUXl1VERpN3R0cFZVazNiSWRnM0VMOERoQnhueUl3c1BQZTltUGdTU3JJWVctTU9uV1ZuSXBzV1drbzN2WG9ZWkhyTms0QT09In0seyJidWNrZXQiOiJhbnRpLWN1YmUtaW1hZ2VzIn0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCJ1c2VySWQvIl1dfQ==',
    signature: '2/UnWnkeKZeGQvuS/WfLN2+kKf0=',
  }
  const requestUploadParams = function () {
    //To do request params
  }

  return (
    uploadOptions && (
      <div>
        <UploadForm uploadOptions={uploadOptions}></UploadForm>
        <form>
          <label>Description:</label>
          <input type={'text'} />
          <input type={'submit'} value={'Post'} />
        </form>
      </div>
    )
  )
}
export default PostEditForm
