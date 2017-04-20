import React from 'react';
import { Router, Route } from 'dva/router';
import Apps from "./routes/Apps.js";
import AppDetail from './routes/AppDetail.js'
import Entry from "./routes/Entry.js";
import LoginCallback from "./routes/LoginCallback.js";

function RouterConfig({ history }) {

  return (
    <Router history={history}>
      <Route path="/" component={Entry} >
        <Route path="/apps/:id" component={AppDetail} />
        <Route path="/apps" component={Apps} />
      </Route>
      <Route path="/loginCallback" component={LoginCallback} />
    </Router>
  );
}

export default RouterConfig;
