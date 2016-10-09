import React, { Component } from 'react'
import cn from 'classnames'
import Grid from './core/Grid'
import AwesomeIcon from './core/AwesomeIcon'
import styles from './Footer.scss'

class Footer extends Component {

  render() {
    const linkStyles = cn(styles.link)
    return (
      <Grid>
        <div className={styles.footer}>
          <div className={styles.social}>
            <a href="http://twitter.com/UICraftsman" className={linkStyles} target="_blank">
              <AwesomeIcon icon="twitter-square"/>
            </a>
            <a href="http://github.com/joemcbride" className={linkStyles} target="_blank">
              <AwesomeIcon icon="github-square"/>
            </a>
          </div>
          <p>Brought to you by your neighbors.</p>
          <p>Hand crafted in Henderson, NV</p>
        </div>
      </Grid>
    )
  }
}

export default Footer
