import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './pages/login'
import Regsiter from './pages/regsiter'
import Send from './pages/send'
import Update from './pages/update'
import Forgot from './pages/forgot'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/regsiter" component={Regsiter} />
        <Route exact path="/send" component={Send} />
        <Route exact path="/update" component={Update} />
        <Route exact path="/forgot" component={Forgot} />
      </Switch>
    </Router>
  )
}

export default App
