import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import Wizard1 from './components/Wizard/Wizard1'
import Vehicle from './components/Vehicle/Vehicle'
import Profile from './components/Profile/Profile'
import StripeForm from './components/Login/StripeForm'

export default (
    <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/home' component={Home} />
        <Route path='/wizard1' component={Wizard1} />
        <Route path='/vehicle' component={Vehicle} />
        <Route path='/profile' component={Profile} />
        <Route path='/payment' component={StripeForm} />
    </Switch>
)