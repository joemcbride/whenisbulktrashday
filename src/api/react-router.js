import fs from 'fs'
import path from 'path'
import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { ServerRouter, createServerRenderContext } from 'react-router'
import { PUBLIC_DIR } from '../modules/Constants'
import Html from '../app/Html'
import Routes from '../app/Routes'

function getWebpackStats() {
  const file = path.resolve(PUBLIC_DIR, 'stats.json')
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

function getAssetPaths(stats, regex) {
  return Object.keys(stats.assetsByChunkName).reduce((assets, key) => {
    const chunk = stats.assetsByChunkName[key]
    const chunkArray = Array.isArray(chunk) ? chunk : [chunk]
    return assets.concat(chunkArray
      .filter(asset => (regex).test(asset))
      .map((asset) => stats.publicPath + asset)
    )
  }, [])
}

function getStyleTags(stats) {
  return getAssetPaths(stats, /\.css$/).map(href => (
    <link key={href} rel="stylesheet" href={href}/>
  ))
}

function getJavaScriptTags(stats) {
  return getAssetPaths(stats, /\.js$/).map(src => (
    <script key={src} src={src}/>
  ))
}

export default function router(req, res) {
  // first create a context for <ServerRouter>, it's where we keep the
  // results of rendering for the second pass if necessary
  const context = createServerRenderContext()


  // render the first time
  let markup = renderToString(
    <ServerRouter
      location={req.url}
      context={context}
    >
      <Routes/>
    </ServerRouter>
  )

  // get the result
  const result = context.getResult()

  // the result will tell you if it redirected, if so, we ignore
  // the markup and send a proper redirect.
  if (result.redirect) {
    res.writeHead(301, {
      Location: result.redirect.pathname
    })
    res.end()
  } else {
    // the result will tell you if there were any misses, if so
    // we can send a 404 and then do a second render pass with
    // the context to clue the <Miss> components into rendering
    // this time (on the client they know from componentDidMount)
    if (result.missed) {
      res.writeHead(404)
      markup = renderToString(
        <ServerRouter
          location={req.url}
          context={context}
        >
          <Routes/>
        </ServerRouter>
      )
    }

    const webpackStats = getWebpackStats()
    const styles = getStyleTags(webpackStats)
    const scripts = getJavaScriptTags(webpackStats)

    const html = renderToStaticMarkup(<Html styles={styles} scripts={scripts} content={markup}/>)
    res.send(html)
  }
}
