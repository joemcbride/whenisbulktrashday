import React, { Component } from 'react'
import styles from './Button.scss'

export default class Button extends Component {

  static propTypes = {
    children: React.PropTypes.node,
    link: React.PropTypes.string
  }

  render() {
    const props = {
      href: this.props.link || '#'
    }
    return (
      <a {...props} className={styles.button}>
        {this.props.children}
      </a>
    )
  }
}
