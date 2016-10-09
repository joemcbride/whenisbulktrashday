import React, { Component } from 'react'
import cn from 'classnames'
import styles from './Grid.scss'

export default class Grid extends Component {

  static propTypes = {
    background: React.PropTypes.string,
    children: React.PropTypes.node
  }

  render() {
    const classes = cn(styles.container, this.props.background)
    return (
      <div className={classes}>
        {this.props.children}
      </div>
    )
  }
}
