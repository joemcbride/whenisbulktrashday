import React from 'react'
import serialize from 'serialize-javascript'
import favicon from './favicon.ico'

const { arrayOf, string, node, object } = React.PropTypes

const Html = ({ styles, scripts, content, title, initialState }) => (
  <html>
    <head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="shortcut icon" href={favicon}/>
      <title>{title}</title>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css" />
      {styles}
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: content }}/>
      <script dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(initialState)};` }} />
      {scripts}
    </body>
  </html>
)

Html.propTypes = {
  styles: arrayOf(node),
  scripts: arrayOf(node),
  content: string,
  title: string,
  initialState: object
}

export default Html
