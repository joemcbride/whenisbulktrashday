import React, { Component } from 'react'
import cn from 'classnames'
import styles from './Col.scss'

export default class Col extends Component {

  static propTypes = {
    col: React.PropTypes.number,
    children: React.PropTypes.node
  }

  render() {
    const classes = cn(styles[`col-${this.props.col}`])
    return (
      <div className={classes}>
        {this.props.children}
      </div>
    )
  }
}
