import Home from './components/payroll-form/payroll-form';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
function App() {
  return (
    <div>
    <Router>
      <Switch>
        <Route path ="/home" component={Home} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
