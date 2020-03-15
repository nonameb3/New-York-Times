import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Homepage from './pages/homepage/homepage.container';

const DetailPage = React.lazy(() => import('./pages/detail/detail.container'));

function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ textAlign: 'center' }}>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/detail" component={DetailPage} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default Router;
