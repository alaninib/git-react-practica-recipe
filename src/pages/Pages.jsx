import React from 'react';
import { Route, Switch} from 'react-router-dom';
import Home from './Home';
import Cuisine from './Cuisine';

export default function Pages() {

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/cuisine/:type" component={Cuisine} />
    </Switch>
  )
}
