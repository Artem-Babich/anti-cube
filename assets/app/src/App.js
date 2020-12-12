import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Modal } from './Modal/Modal'
import './App.css'
import { Gallery } from './Gallery/Gallery'
import AppHeader from './Header/AppHeader'

function App() {
  return (
    <div className={'App'}>
      <AppHeader />
      <Router>
        <Switch>
          <Route exact path="/" component={Gallery} />
          <Route path="/gallery" component={Gallery} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
