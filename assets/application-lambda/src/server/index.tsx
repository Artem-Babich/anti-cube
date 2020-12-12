import Trie from 'route-trie'

import createStaticFileHandler from './handlers/createStaticFileHandler'
import createDistFileHandler from './handlers/createDistFileHandler'
import createPostHandler from './handlers/createPostHandler'
import createUploadImageHandler from './handlers/createUploadImageHandler'
import exploreHandler from './handlers/exploreHandler'
import failHandler from './handlers/failHandler'
import getPostHandler from './handlers/getPostHandler'
import getPostsHandler from './handlers/getPostsHandler'
import likeHandler from './handlers/likeHandler'
import loginHandler from './handlers/loginHandler'
import markupHandler from './handlers/markupHandler'
import registerHandler from './handlers/registerHandler'

import wrapApiGatewayEvent from './wrapApiGatewayEvent'
import { Context } from './types'

const initTrie = (context: Context) => {
  const trie = new Trie({
    ignoreCase: true,
    fixedPathRedirect: true,
    trailingSlashRedirect: true,
  })
  trie.define('/heart.png').handle('GET', createStaticFileHandler('heart.png', 'image/png'))
  trie.define('/styles.css').handle('GET', createStaticFileHandler('styles.css', 'text/css', true))
  trie
    .define('/client.js')
    .handle('GET', createDistFileHandler('client.js', 'text/javascript', true))
  trie
    .define('/client.js.LICENSE.txt')
    .handle('GET', createDistFileHandler('client.js.LICENSE.txt', 'text/plain'))

  trie.define('/auth/registration').handle('POST', registerHandler)
  trie.define('/auth/login').handle('POST', loginHandler)
  trie.define('/api/explore').handle('GET', exploreHandler)
  trie.define('/api/:userId').handle('GET', getPostHandler)
  trie.define('/api/:userId/upload').handle('GET', createUploadImageHandler(context))
  trie.define('/api/:userId/posts').handle('POST', createPostHandler)
  trie.define('/api/:userId/posts/:postId').handle('GET', getPostsHandler)
  trie.define('/api/:userId/posts/:postId/like').handle('PUT', likeHandler)

  trie.define('/:markup*').handle('GET', markupHandler)

  return trie
}

export const handler = async (event: any, context: Context) => {
  const { req, res } = wrapApiGatewayEvent(event)

  const { node, params, fpr, tsr } = initTrie(context).match(req.url)
  req.params = params

  if (fpr != null && fpr !== '') {
    res.redirect(fpr)
  } else if (tsr != null && tsr !== '') {
    res.redirect(tsr)
  } else if (node == null) {
    failHandler(req, res)
  } else {
    const handler = node.getHandler(req.method.toUpperCase())

    if (typeof handler !== 'function') {
      failHandler(req, res)
    }

    try {
      await handler(req, res)
    } catch (error) {
      res.status(Number.isInteger(error.code) ? error.code : 500)
      res.end(`${error}`)
    }
  }

  return res.INTERNAL
}
