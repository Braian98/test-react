import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from '../Login';
import Products from '../Products';
import PrivateRoute from '../PrivateRoute';

function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route path="/login">
              <Login/>
            </Route>
            <PrivateRoute exact path="/">
              <Products />
            </PrivateRoute>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
