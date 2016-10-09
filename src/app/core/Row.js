import React, { Component } from 'react'
import cn from 'classnames'
import styles from './Row.scss'

export default class Row extends Component {

  static propTypes = {
    className: React.PropTypes.string,
    children: React.PropTypes.node
  }

  render() {
    const classes = cn(styles.row, this.props.className)
    return (
      <div className={classes}>
        {this.props.children}
      </div>
    )
  }
}
