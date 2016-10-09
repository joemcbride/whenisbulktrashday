import React from 'react'
import Remarkable from 'remarkable'
import cn from 'classnames'
import hljs from 'highlight.js'
import './Markdown.scss'

class Markdown extends React.Component {

  static propTypes = {
    options: React.PropTypes.object,
    source: React.PropTypes.string,
    container: React.PropTypes.string,
    children: React.PropTypes.node,
    className: React.PropTypes.string
  }

  static defaultProps = {
    container: 'div',
    options: {}
  }

  constructor(props) {
    super(props)

    this.content = this.content.bind(this)
    this.renderMarkdown = this.renderMarkdown.bind(this)
    this.create = this.create.bind(this)
  }

  componentWillUpdate(nextProps) {
    if (nextProps.options !== this.props.options) {
      this.md = this.create(nextProps.options)
    }
  }

  renderMarkdown(source) {
    if (!this.md) {
      this.md = this.create(this.props.options)
    }

    return this.md.render(source)
  }

  render() {
    const Container = this.props.container
    return (
      <Container className={cn('markdown', this.props.className)}>
        {this.content()}
      </Container>
    )
  }

  content() {
    if (this.props.source) {
      return <span dangerouslySetInnerHTML={{ __html: this.renderMarkdown(this.props.source) }} />
    }
    return null
  }

  create() {
    const mark = new Remarkable({
      highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value
          } catch (err) {
            console.log(err) // eslint-disable-line no-console
          }
        }

        try {
          return hljs.highlightAuto(str).value
        } catch (err) {
          console.log(err) // eslint-disable-line no-console
        }

        return '' // use external default escaping
      }
    })
    return mark
  }
}

export default Markdown
