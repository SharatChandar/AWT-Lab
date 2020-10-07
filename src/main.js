
import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Login from './pages/login.js';
import Selling from './pages/selling.js';
import Adding from './pages/adding.js';
import Stock from './pages/stock.js';
import Registor from './pages/registor';
import Navbar from './pages/navbar';
import Manage from './pages/mange';

const Main = props => (
  <Switch>
    
    <Route exact path='/l' component={Navbar} />
    <Route exact path='/' component={Login} />
    <Route exact path='/sell' component={Selling} />
    <Route exact path='/adding' component={Adding} />
    <Route exact path='/stock' component={Stock} />
    <Route exact path='/registor' component={Registor} />
    <Route exact path='/manage' component={Manage} />
    </Switch>
);

export default Main;
