import React from 'react';
import {Router, Route} from 'react-router-dom';
import history from './config/history';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Home from './components/Home/Home';

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact={true} path="/" component={Home}/>
          <Route path="/signup" component={SignUp}/>
          <Route path="/login" component={Login}/>
        </div>
      </Router>
    );
  }

}


export default App;