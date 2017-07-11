import React from 'react'
import { Route } from 'react-router-dom'
import Home from './Home'
import Footer from './Footer'

const Routes = () => (
  <div>
    <Route exact path="/" component={Home} />
    <Footer/>
  </div>
)

export default Routes
