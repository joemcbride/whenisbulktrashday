import React, { Component } from 'react'
import cn from 'classnames'

class AwesomeIcon extends Component {
  static propTypes = {
    icon: React.PropTypes.string.isRequired,
    className: React.PropTypes.string
  }

  render() {
    const { icon, className } = this.props
    const styles = cn('fa', `fa-${icon}`, className)
    return (
      <i className={styles} />
    )
  }
}

export default AwesomeIcon
