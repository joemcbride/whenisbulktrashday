import React, { Component } from 'react'
import styles from './Hero.scss'

export default class Hero extends Component {

  static propTypes = {
    title: React.PropTypes.node.isRequired,
    subTitle: React.PropTypes.node,
    children: React.PropTypes.node
  }

  render() {
    const subTitle = this.props.subTitle
      ? (<p>{this.props.subTitle}</p>)
      : null
    return (
      <div className={styles.hero}>
        {subTitle}
        <h1>{this.props.title}</h1>
        {this.props.children}
      </div>
    )
  }
}
