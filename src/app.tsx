import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { routes } from './routes';

const App = () => {
  return (
    <Router>
      <Switch>
        {routes.map((route) => (
          <Route path={route.path} key={route.path} component={route.component} />
        ))}
      </Switch>
    </Router>
  );
};

export default App;
