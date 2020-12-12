import Trie from 'route-trie'

import createDistFileHandler from './handlers/createDistFileHandler'
import markupHandler from './handlers/markupHandler'
import failHandler from './handlers/failHandler'
import createUploadImageHandler from './handlers/createUploadImageHandler'

import wrapApiGatewayEvent from './wrapApiGatewayEvent'
import { Context } from './types'

const initTrie = (context: Context) => {
  const trie = new Trie({
    ignoreCase: true,
    fixedPathRedirect: true,
    trailingSlashRedirect: true,
  })
  trie.define('/client.js').handle('GET', createDistFileHandler('client.js', 'text/javascript'))
  trie
    .define('/client.js.LICENSE.txt')
    .handle('GET', createDistFileHandler('client.js.LICENSE.txt', 'text/plain'))
  trie.define('/:markup*').handle('GET', markupHandler)
  trie.define('/:userId/upload').handle('GET', createUploadImageHandler(context))

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
