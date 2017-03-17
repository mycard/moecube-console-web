import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Apps from "./routes/Apps.js";
import AppDetail from './routes/AppDetail.js'
import Entry from "./routes/Entry.js";
import LoginCallback from "./routes/LoginCallback.js";

function RouterConfig({ history }) {

  return (
    <Router history={history}>
      <Route path="/" component={Entry} >
        <Route path="apps" component={Apps} />
        <Route path="apps/:id" component={AppDetail} />
      </Route>
      
      <Route path="/loginCallback" component={LoginCallback} />
      <Route path="*" component={() => <div>404</div>}/>
    </Router>
  );
}

export default RouterConfig;
