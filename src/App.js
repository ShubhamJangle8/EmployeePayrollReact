import PayrollForm from './components/payroll-form/payroll-form4';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import React, { Component } from 'react'
import Home from './components/Home/home'
class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Router>
            <Switch>
              <Route exact path={["/employee", "/payroll-form/:id"]}>
                <PayrollForm />
              </Route>
              <Route path="/home" component={Home} />
              <Route exact path="">
                <Redirect exact from="/" to="/home" />
              </Route>
            </Switch>
          </Router>

        </div>

      </div >
    )
  }
}

export default App

