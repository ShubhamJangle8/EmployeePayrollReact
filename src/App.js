import PayrollForm from './components/payroll-form/payroll-form1';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
function App() {
  return (
    <div>
    <Router>
      <Switch>
        <Route path ="/home" component={PayrollForm} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
