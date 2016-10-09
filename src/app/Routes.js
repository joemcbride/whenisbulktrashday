import React from 'react'
import { Match } from 'react-router'
import Home from './Home'
import Footer from './Footer'

const Routes = () => (
  <div>
    <Match exactly pattern="/" component={Home} />
    <Footer/>
  </div>
)

export default Routes
